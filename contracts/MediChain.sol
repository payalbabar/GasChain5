// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MediChain {
    // Structures
    struct Record {
        uint256 id;
        string recordCid;     // IPFS Content Identifier
        string title;
        uint256 timestamp;
        address doctor;       // Doctor who uploaded (if any), otherwise patient address
    }

    struct Patient {
        bool isRegistered;
        string name;
        uint256[] recordIds;
    }

    struct Doctor {
        bool isRegistered;
        string name;
        string specialization;
        uint256 consultationFee;
    }

    struct Appointment {
        uint256 id;
        address patient;
        address doctor;
        uint256 timestamp;
        bool isCompleted;
        bool isCancelled;
        uint256 feePaid;
    }

    // State Variables
    address public admin;
    uint256 private nextRecordId = 1;
    uint256 private nextAppointmentId = 1;

    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;
    mapping(uint256 => Record) public records;
    mapping(uint256 => Appointment) public appointments;
    
    // permissions[patient][doctor] = bool
    mapping(address => mapping(address => bool)) public patientToDoctorPermissions;

    // Events
    event PatientRegistered(address indexed patient, string name);
    event DoctorRegistered(address indexed doctor, string name, string specialization);
    event RecordAdded(uint256 indexed recordId, address indexed patient, string title);
    event PermissionUpdated(address indexed patient, address indexed doctor, bool granted);
    event AppointmentBooked(uint256 indexed appointmentId, address indexed patient, address indexed doctor, uint256 fee);
    event AppointmentCompleted(uint256 indexed appointmentId, address indexed doctor, uint256 feeEarned);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier onlyRegisteredPatient() {
        require(patients[msg.sender].isRegistered, "Patient not registered");
        _;
    }

    modifier onlyRegisteredDoctor() {
        require(doctors[msg.sender].isRegistered, "Doctor not registered");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // 1. Registration
    function registerPatient(string memory _name) external {
        require(!patients[msg.sender].isRegistered, "Patient already registered");
        patients[msg.sender].isRegistered = true;
        patients[msg.sender].name = _name;
        emit PatientRegistered(msg.sender, _name);
    }

    // Register Doctor (could be admin-only in production, making it open for MVP)
    function registerDoctor(string memory _name, string memory _specialization, uint256 _consultationFee) external {
        require(!doctors[msg.sender].isRegistered, "Doctor already registered");
        doctors[msg.sender].isRegistered = true;
        doctors[msg.sender].name = _name;
        doctors[msg.sender].specialization = _specialization;
        doctors[msg.sender].consultationFee = _consultationFee;
        emit DoctorRegistered(msg.sender, _name, _specialization);
    }

    // 2. Records Management
    function addRecord(string memory _recordCid, string memory _title) external onlyRegisteredPatient {
        uint256 currentId = nextRecordId++;
        records[currentId] = Record(currentId, _recordCid, _title, block.timestamp, msg.sender);
        patients[msg.sender].recordIds.push(currentId);
        emit RecordAdded(currentId, msg.sender, _title);
    }

    function addRecordForPatient(address _patient, string memory _recordCid, string memory _title) external onlyRegisteredDoctor {
        require(patientToDoctorPermissions[_patient][msg.sender], "Not authorized by patient");
        require(patients[_patient].isRegistered, "Patient not registered");

        uint256 currentId = nextRecordId++;
        records[currentId] = Record(currentId, _recordCid, _title, block.timestamp, msg.sender);
        patients[_patient].recordIds.push(currentId);
        emit RecordAdded(currentId, _patient, _title);
    }

    function getPatientRecords(address _patient) external view returns (Record[] memory) {
        // Patient can view their own; Doctor needs permission
        if (msg.sender != _patient) {
            require(patientToDoctorPermissions[_patient][msg.sender], "Not authorized to view records");
        }
        
        uint256[] memory recordIds = patients[_patient].recordIds;
        Record[] memory patientRecords = new Record[](recordIds.length);
        
        for (uint256 i = 0; i < recordIds.length; i++) {
            patientRecords[i] = records[recordIds[i]];
        }
        return patientRecords;
    }

    // 3. Access Control
    function grantAccess(address _doctor) external onlyRegisteredPatient {
        require(doctors[_doctor].isRegistered, "Doctor not registered");
        patientToDoctorPermissions[msg.sender][_doctor] = true;
        emit PermissionUpdated(msg.sender, _doctor, true);
    }

    function revokeAccess(address _doctor) external onlyRegisteredPatient {
        patientToDoctorPermissions[msg.sender][_doctor] = false;
        emit PermissionUpdated(msg.sender, _doctor, false);
    }

    // 4. Appointments & Payments (Escrow)
    function bookAppointment(address _doctor) external payable onlyRegisteredPatient {
        uint256 fee = doctors[_doctor].consultationFee;
        require(msg.value == fee, "Incorrect consultation fee amount sent");

        uint256 currentId = nextAppointmentId++;
        appointments[currentId] = Appointment(currentId, msg.sender, _doctor, block.timestamp, false, false, msg.value);
        
        emit AppointmentBooked(currentId, msg.sender, _doctor, msg.value);
    }

    function completeAppointment(uint256 _appointmentId) external onlyRegisteredDoctor {
        Appointment storage appt = appointments[_appointmentId];
        require(appt.doctor == msg.sender, "Only the assigned doctor can complete");
        require(!appt.isCompleted && !appt.isCancelled, "Appointment already finalized");

        appt.isCompleted = true;
        
        // Transfer fee to doctor
        (bool success, ) = payable(msg.sender).call{value: appt.feePaid}("");
        require(success, "Transfer to doctor failed");

        emit AppointmentCompleted(_appointmentId, msg.sender, appt.feePaid);
    }

    // Cancel and refund patient
    function cancelAppointment(uint256 _appointmentId) external {
        Appointment storage appt = appointments[_appointmentId];
        require(msg.sender == appt.patient || msg.sender == appt.doctor, "Not authorized");
        require(!appt.isCompleted && !appt.isCancelled, "Appointment already finalized");

        appt.isCancelled = true;

        // Refund patient
        (bool success, ) = payable(appt.patient).call{value: appt.feePaid}("");
        require(success, "Refund to patient failed");
    }
}
