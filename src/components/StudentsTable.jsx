import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, deleteDoc, addDoc, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from "react-icons/fa";
const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false); // Added View Modal state
    const { user } = useSelector((state) => state.user);
    const [studentToUpdate, setStudentToUpdate] = useState(null);
    const [studentToView, setStudentToView] = useState(null); // Added state to hold student data for viewing
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: '',
        class: '',
        section: '',
        rollNumber: '',
        fathersName: '',
        mothersName: '',
        address: '',
        contactNumber: '',
        email: '',
        dateOfBirth: '',
        guardianName: '',
        guardianContact: '',
        admissionDate: '',
    });
    const db = getFirestore();

    const fetchStudents = async () => {
        if (user?.uid) {
            const q = query(collection(db, 'students'), where('userRef', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const studentsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsList);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [db, user]);

    const handleAddStudent = async () => {
        try {
            const age = await calculateAge(newStudent.dateOfBirth)
            const studentWithRef = { ...newStudent,age, userRef: user?.uid || '' };
            const docRef = await addDoc(collection(db, 'students'), studentWithRef);
            setStudents((prev) => [...prev, { id: docRef.id, ...studentWithRef }]);
            setShowAddModal(false);
            setNewStudent({
                name: '',
                class: '',
                section: '',
                rollNumber: '',
                fathersName: '',
                mothersName: '',
                address: '',
                contactNumber: '',
                email: '',
                dateOfBirth: '',
                guardianName: '',
                guardianContact: '',
                admissionDate: '',
               
            });
            console.log('Student added:', studentWithRef);
        } catch (err) {
            console.error('Error adding student:', err);
        }
    };

    const handleUpdateStudent = async () => {
        if (!studentToUpdate) return;

        try {
            for (const student of students) {
                if (student.id === studentToUpdate.id && student.dateOfBirth !== studentToUpdate.dateOfBirth) {
                    // Calculate the new age if the date of birth is updated
                    const age = calculateAge(studentToUpdate.dateOfBirth); // Sync, no need for `await` here
                    
                    // Update the student object with the new age
                    studentToUpdate.age = age;
                    break; // Exit loop once the relevant student is updated
                }
            }
            
            const studentRef = doc(db, 'students', studentToUpdate.id);
            await updateDoc(studentRef, studentToUpdate);
            setStudents((prev) => prev.map((student) => (student.id === studentToUpdate.id ? studentToUpdate : student)));
            setShowUpdateModal(false);
            setStudentToUpdate(null);
            console.log('Student updated:', studentToUpdate);
        } catch (err) {
            console.error('Error updating student:', err);
        }
    };

    const handleDeleteStudent = async (id) => {
        const studentRef = doc(db, "students", id);
        await deleteDoc(studentRef);
        fetchStudents();
    };

    const openUpdateModal = (student) => {
        setStudentToUpdate(student);
        setShowUpdateModal(true);
    };

    const openViewModal = (student) => { // Open View Modal
        setStudentToView(student);
        setShowViewModal(true);
    };

    function calculateAge(dateOfBirth) {
        const today = new Date(); 
        const birthDate = new Date(dateOfBirth); 
    
        let age = today.getFullYear() - birthDate.getFullYear(); 
    
        
        const hasBirthdayPassed = 
            today.getMonth() > birthDate.getMonth() || 
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    
        if (!hasBirthdayPassed) {
            age -= 1; 
        }
    
        return age;
    }
    return (
        <div className="p-6 bg-[#F9FAFB] w-full">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold mb-4">Students Page</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Student
                </button>
                <div className="relative md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 p-2 rounded hover:bg-gray-200"
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-40">
                            <ul className="flex flex-col">
                                <li>
                                    <button
                                        onClick={() => {
                                            navigate('/');
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Students
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Student Modal */}
            {/* Add Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white max-h-screen hide-scrollbar overflow-y-auto p-6 rounded shadow-md w-full max-w-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add Student</h2>
                        <form>
                            {Object.keys(newStudent).map((field) => (
                                <div key={field} className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type={field === "dateOfBirth" || field === "admissionDate" ? "date" : "text"}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={newStudent[field]}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, [field]: e.target.value })
                                        }
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddStudent}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Student Modal */}
            {showUpdateModal && studentToUpdate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white max-h-screen hide-scrollbar overflow-y-auto p-6 rounded shadow-md w-full max-w-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-4">Update Student</h2>
                        <form>
                            {Object.keys(studentToUpdate).map((field) => (
                                field !== "id" && field !== "userRef" && field !== "age" && (
                                    <div key={field} className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 capitalize">
                                            {field}
                                        </label>
                                        <input
                                            type={field === "dateOfBirth" || field === "admissionDate" ? "date" : "text"}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={studentToUpdate[field]}
                                            onChange={(e) =>
                                                setStudentToUpdate({ ...studentToUpdate, [field]: e.target.value })
                                            }
                                        />
                                    </div>
                                )
                            ))}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateModal(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleUpdateStudent}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Student Modal */}
            {showViewModal && studentToView && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white max-h-screen hide-scrollbar overflow-y-auto p-6 rounded shadow-md w-full max-w-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
                        <h2 className="text-xl font-bold mb-4">View Student</h2>
                        <div className="space-y-4">
                            {Object.keys(studentToView).map((field) => (
                                field !== "id" && field !== "userRef" && (
                                    <div key={field}>
                                        <label className="block text-sm font-medium text-gray-700 capitalize">
                                            {field}
                                        </label>
                                        <div className="text-gray-600">{studentToView[field]}</div>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowViewModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="rounded-3xl mt-6  h-screen hide-scrollbar overflow-y-scroll shadow-xl p-6 bg-white">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-6 gap-6 mb-4">
                    <div className="font-bold">ID</div>
                    <div className="font-bold">Name</div>
                    <div className="font-bold">Class</div>
                    <div className="font-bold">Section</div>
                    <div className="font-bold">Roll Number</div>
                    <div className="font-bold">Actions</div>
                </div>

                {/* Table Rows */}
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="grid grid-cols-1 md:grid-cols-6 gap-4 border-b py-4"
                    >
                        {/* Mobile Layout */}
                        <div className="md:hidden">
                            <div className="font-bold">ID:</div>
                            <div className="overflow-x-scroll">{student.id}</div>
                        </div>
                        <div className="md:hidden">
                            <div className="font-bold">Name:</div>
                            <div>{student.name}</div>
                        </div>
                        <div className="md:hidden">
                            <div className="font-bold">Class:</div>
                            <div>{student.class}</div>
                        </div>
                        <div className="md:hidden">
                            <div className="font-bold">Section:</div>
                            <div>{student.section}</div>
                        </div>
                        <div className="md:hidden">
                            <div className="font-bold">Roll Number:</div>
                            <div>{student.rollNumber}</div>
                        </div>
                        <div className="md:hidden">
                            <div className="font-bold">Actions:</div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openViewModal(student)}
                                    className="text-blue-500 hover:underline"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => openUpdateModal(student)}
                                    className="text-green-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteStudent(student.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:block hide-scrollbar overflow-x-scroll">{student.id}</div>
                        <div className="hidden md:block">{student.name}</div>
                        <div className="hidden md:block">{student.class}</div>
                        <div className="hidden md:block">{student.section}</div>
                        <div className="hidden md:block">{student.rollNumber}</div>
                        <div className="hidden md:flex space-x-2">
                            <button
                                onClick={() => openViewModal(student)}
                                className="text-blue-500 cursor-pointer hover:underline"
                            >
                                View
                            </button>
                            <button
                                onClick={() => openUpdateModal(student)}
                                className="text-green-500 cursor-pointer hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteStudent(student.id)}
                                className="text-red-500 cursor-pointer hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default StudentsPage;
