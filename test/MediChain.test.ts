import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("MediChain", function () {
  async function deployMediChainFixture() {
    const [admin, patient, doctor, doctor2] = await ethers.getSigners();
    const MediChain = await ethers.getContractFactory("MediChain");
    const mediChain = await MediChain.deploy();
    return { mediChain, admin, patient, doctor, doctor2 };
  }

  describe("Registration", function () {
    it("Should register a patient", async function () {
      const { mediChain, patient } = await loadFixture(deployMediChainFixture);
      await expect(mediChain.connect(patient).registerPatient("John Doe"))
        .to.emit(mediChain, "PatientRegistered")
        .withArgs(patient.address, "John Doe");
      
      const p = await mediChain.patients(patient.address);
      expect(p.isRegistered).to.be.true;
      expect(p.name).to.equal("John Doe");
    });

    it("Should register a doctor", async function () {
      const { mediChain, doctor } = await loadFixture(deployMediChainFixture);
      const fee = ethers.parseEther("0.1");
      await expect(mediChain.connect(doctor).registerDoctor("Dr. Smith", "Cardiology", fee))
        .to.emit(mediChain, "DoctorRegistered")
        .withArgs(doctor.address, "Dr. Smith", "Cardiology");
      
      const d = await mediChain.doctors(doctor.address);
      expect(d.isRegistered).to.be.true;
      expect(d.consultationFee).to.equal(fee);
    });
  });

  describe("Records and Permissions", function () {
    it("Should allow patient to add a record", async function () {
      const { mediChain, patient } = await loadFixture(deployMediChainFixture);
      await mediChain.connect(patient).registerPatient("John Doe");
      
      await expect(mediChain.connect(patient).addRecord("QmTestHash", "Blood Test"))
        .to.emit(mediChain, "RecordAdded")
        .withArgs(1, patient.address, "Blood Test");
        
      const records = await mediChain.getPatientRecords(patient.address);
      expect(records.length).to.equal(1);
      expect(records[0].recordCid).to.equal("QmTestHash");
    });

    it("Should allow doctor to add record if granted permission", async function () {
      const { mediChain, patient, doctor } = await loadFixture(deployMediChainFixture);
      await mediChain.connect(patient).registerPatient("John");
      await mediChain.connect(doctor).registerDoctor("Dr. Smith", "Cardiology", 0);
      
      await mediChain.connect(patient).grantAccess(doctor.address);
      
      await expect(mediChain.connect(doctor).addRecordForPatient(patient.address, "QmTestHash2", "MRI"))
        .to.emit(mediChain, "RecordAdded")
        .withArgs(1, patient.address, "MRI");
    });

    it("Should block doctor from viewing patient records without permission", async function () {
      const { mediChain, patient, doctor } = await loadFixture(deployMediChainFixture);
      await mediChain.connect(patient).registerPatient("John");
      await mediChain.connect(patient).addRecord("hash", "title");
      
      await expect(mediChain.connect(doctor).getPatientRecords(patient.address))
        .to.be.revertedWith("Not authorized to view records");
        
      await mediChain.connect(patient).grantAccess(doctor.address);
      const records = await mediChain.connect(doctor).getPatientRecords(patient.address);
      expect(records.length).to.equal(1);
    });
  });

  describe("Appointments", function () {
    it("Should book and complete an appointment successfully", async function () {
      const { mediChain, patient, doctor } = await loadFixture(deployMediChainFixture);
      const fee = ethers.parseEther("1.0");
      await mediChain.connect(patient).registerPatient("John");
      await mediChain.connect(doctor).registerDoctor("Dr. Smith", "Cardio", fee);
      
      // Book
      await expect(mediChain.connect(patient).bookAppointment(doctor.address, { value: fee }))
        .to.emit(mediChain, "AppointmentBooked")
        .withArgs(1, patient.address, doctor.address, fee);
        
      const beforeBal = await ethers.provider.getBalance(doctor.address);
      
      // Complete
      await expect(mediChain.connect(doctor).completeAppointment(1))
        .to.emit(mediChain, "AppointmentCompleted")
        .withArgs(1, doctor.address, fee);
        
      const afterBal = await ethers.provider.getBalance(doctor.address);
      // Fee should be transferred, ignoring small gas diffs in the doctor asserting
      expect(afterBal).to.be.greaterThan(beforeBal);
    });

    it("Should allow cancellation and refund patient", async function () {
      const { mediChain, patient, doctor } = await loadFixture(deployMediChainFixture);
      const fee = ethers.parseEther("1.0");
      await mediChain.connect(patient).registerPatient("John");
      await mediChain.connect(doctor).registerDoctor("Dr. Smith", "Cardio", fee);
      
      const pBeforeBal = await ethers.provider.getBalance(patient.address);
      
      // Book (deducts 1.0 + gas)
      const tx = await mediChain.connect(patient).bookAppointment(doctor.address, { value: fee });
      const receipt = await tx.wait();
      const gasUsedBook = receipt!.gasUsed * receipt!.gasPrice;
      
      // Cancel (refunds 1.0)
      const tx2 = await mediChain.connect(patient).cancelAppointment(1);
      const receipt2 = await tx2.wait();
      const gasUsedCancel = receipt2!.gasUsed * receipt2!.gasPrice;
      
      const pAfterBal = await ethers.provider.getBalance(patient.address);
      const expectedRefundDiff = pBeforeBal - gasUsedBook - gasUsedCancel;
      expect(pAfterBal).to.equal(expectedRefundDiff);
    });
  });
});
