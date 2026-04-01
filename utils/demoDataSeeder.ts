
import { UserState, GradeRecord, ScheduleSlot, LearningNeed, SavedItem, SavedResource, StudentNotification } from '../types';

export const seedDemoData = () => {
    // Bump version to force update 
    const CURRENT_VERSION = 'v13_curriculum_sync';
    const installedVersion = localStorage.getItem('motlatsi_data_version');

    if (installedVersion === CURRENT_VERSION) return;

    console.log("🌱 Seeding Motlatsi Demo Data: Comprehensive Scenario...");

    // Clear old data
    localStorage.removeItem('motlatsi_admin_users');
    localStorage.removeItem('motlatsi_activity_log');
    localStorage.removeItem('motlatsi_schedule');
    localStorage.removeItem('motlatsi_notifications');
    localStorage.removeItem('motlatsi_library');
    localStorage.removeItem('motlatsi_resources');

    const SCHOOL_NAME = "Maseru Primary School";
    const SCHOOL_NAME_2 = "Soofia International School";
    
    const daysAgo = (days: number) => {
        const d = new Date();
        d.setDate(d.getDate() - days);
        d.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60));
        return d.toISOString();
    };

    // --- 1. Define Core Users ---
    
    // Admin (Fixed ID for Login)
    const adminUser = { 
        id: "admin-1", role: "admin", name: "Principal L.", email: "admin@school.ls", 
        school: SCHOOL_NAME, status: "active",
        completedTopics: [], currentGrade: "1" 
    };

    // Teacher: Mr. Thabo (Teaches Gr 5 & 6) (Fixed ID for Login)
    const teacherUser = {
        id: "teacher-1", role: "teacher", name: "Mr. Thabo", email: "thabo@school.ls",
        school: SCHOOL_NAME, currentGrade: "5", 
        subject: "Numerical and Mathematical", // Aligned with curriculum.ts
        teachingSubjects: [
            { subject: "Numerical and Mathematical", grades: ["5", "6"] },
            { subject: "Scientific and Technological", grades: ["6"] }
        ],
        completedTopics: [], linkedStudentIds: ["s-5a", "s-5b", "s-6a", "s-6b"], status: "active"
    };

    // Generic Demo Student 1 (Fixed ID for Login button)
    const demoStudent = { 
        id: "student-1", role: "student", name: "Khotso", email: "khotso@school.ls", 
        school: SCHOOL_NAME, currentGrade: "6", status: "active", completedTopics: ["g6-num-sets"] 
    };

    // Generic Demo Student 2 (New for Parent View)
    const demoStudent2 = {
        id: "student-2", role: "student", name: "Palesa", email: "palesa@school.ls",
        school: SCHOOL_NAME_2, currentGrade: "3", status: "active", completedTopics: []
    };

    // Generic Demo Parent (Fixed ID for Login button) - Linked to TWO students
    const demoParent = { 
        id: "parent-1", role: "parent", name: "Mme Mpho", email: "parent@school.ls", 
        school: SCHOOL_NAME, status: "active", linkedStudentIds: ["student-1", "student-2"],
        completedTopics: [], currentGrade: "1"
    };

    // Detailed Class Students (for Teacher View)
    const student5a = { id: "s-5a", role: "student", name: "Palesa M.", email: "palesa@st.ls", school: SCHOOL_NAME, currentGrade: "5", status: "active", completedTopics: [] };
    const student5b = { id: "s-5b", role: "student", name: "Lerato K.", email: "lerato@st.ls", school: SCHOOL_NAME, currentGrade: "5", status: "active", completedTopics: [] };
    const student6a = { id: "s-6a", role: "student", name: "Khotso T.", email: "khotso@st.ls", school: SCHOOL_NAME, currentGrade: "6", status: "active", completedTopics: [] };
    const student6b = { id: "s-6b", role: "student", name: "Tepo S.", email: "tepo@st.ls", school: SCHOOL_NAME, currentGrade: "6", status: "active", completedTopics: [] };

    const allUsers = [
        adminUser, teacherUser, demoStudent, demoStudent2, demoParent, 
        student5a, student5b, student6a, student6b
    ];

    // --- 2. Activity Logs ---
    const logs: GradeRecord[] = [
        // Demo Student 1 Data
        { id: "l-demo-1", studentId: "student-1", studentName: "Khotso", itemId: "quiz-sets", itemTitle: "Numerical and Mathematical: Sets", score: 8, total: 10, type: "quiz", date: daysAgo(1), topicId: "g6-num-sets" },
        { id: "l-demo-2", studentId: "student-1", studentName: "Khotso", itemId: "quiz-alg", itemTitle: "Numerical and Mathematical: Algebra", score: 5, total: 10, type: "quiz", date: daysAgo(2), topicId: "g7-num-algebra" },

        // Demo Student 2 Data
        { id: "l-demo-3", studentId: "student-2", studentName: "Palesa", itemId: "quiz-shapes", itemTitle: "Numerical and Mathematical: Shapes", score: 9, total: 10, type: "quiz", date: daysAgo(1), topicId: "g3-num-shapes" },
        { id: "l-demo-4", studentId: "student-2", studentName: "Palesa", itemId: "quiz-read", itemTitle: "Linguistic and Literary (English): Reading", score: 7, total: 10, type: "quiz", date: daysAgo(3), topicId: "g3-eng-reading" },


        // Class Data (Grade 5: Fractions struggle)
        { id: "l-1", studentId: "s-5a", studentName: "Palesa M.", itemId: "quiz-frac", itemTitle: "Numerical and Mathematical: Fractions", score: 4, total: 10, type: "quiz", date: daysAgo(1), topicId: "g5-num-fractions-basic" },
        { id: "l-2", studentId: "s-5b", studentName: "Lerato K.", itemId: "quiz-frac", itemTitle: "Numerical and Mathematical: Fractions", score: 5, total: 10, type: "quiz", date: daysAgo(1), topicId: "g5-num-fractions-basic" },
        
        // Class Data (Grade 6: Geometry success, Biology struggle)
        { id: "l-3", studentId: "s-6a", studentName: "Khotso T.", itemId: "quiz-geo", itemTitle: "Numerical and Mathematical: Geometry", score: 9, total: 10, type: "quiz", date: daysAgo(2), topicId: "g6-num-lines-shapes" },
        { id: "l-4", studentId: "s-6a", studentName: "Khotso T.", itemId: "quiz-photo", itemTitle: "Scientific and Technological: Biology", score: 3, total: 10, type: "quiz", date: daysAgo(3), topicId: "g6-sci-biology" },
        { id: "l-5", studentId: "s-6b", studentName: "Tepo S.", itemId: "quiz-photo", itemTitle: "Scientific and Technological: Biology", score: 4, total: 10, type: "quiz", date: daysAgo(3), topicId: "g6-sci-biology" },
    ];

    // --- 3. Schedule ---
    const schedule: ScheduleSlot[] = [
        { id: "sc-1", day: "Mon", time: "08:00", subject: "Grade 5 Numerical and Mathematical", type: "class", location: "Room 4A", notes: "Intro to mixed fractions." },
        { id: "sc-2", day: "Mon", time: "10:00", subject: "Grade 6 Scientific and Technological", type: "class", location: "Lab 1", notes: "Plant structures." },
        { id: "sc-3", day: "Tue", time: "09:00", subject: "Staff Meeting", type: "break", location: "Staff Room", notes: "Term planning." },
        { id: "sc-4", day: "Wed", time: "11:00", subject: "Grade 5 Remedial", type: "remedial", location: "Library", notes: "Reviewing fractions with Palesa.", linkedTopicId: "g5-num-fractions-basic" },
        { id: "sc-5", day: "Thu", time: "08:00", subject: "Grade 6 Numerical and Mathematical", type: "class", location: "Room 4B", notes: "Geometry test prep." },
        { id: "sc-6", day: "Fri", time: "14:00", subject: "Lesson Planning", type: "study", location: "Home", notes: "Prepare for next week." },
    ];

    // --- 4. Library Items & Resources ---
    const libraryItems: SavedItem[] = [
        { id: "lib-1", type: "lesson", title: "Lesson: Fractions Intro", date: daysAgo(5), data: { content: "Introduction to numerators and denominators..." } },
        { id: "lib-2", type: "worksheet", title: "Worksheet: Plant Biology", date: daysAgo(2), data: { content: "Label the parts of the flower..." } },
        { id: "lib-3", type: "flashcard", title: "Flashcards: Geometry Terms", date: daysAgo(10), data: { term: "Polygon", definition: "A plane figure with at least three straight sides." } },
    ];

    const resources: SavedResource[] = [
        { id: "res-1", topicId: "math-fractions-1", title: "Grade 5 Math: Fractions Lesson Plan", type: "lesson-plan", date: daysAgo(5), content: "Detailed lesson plan for fractions...", tags: ["math", "grade5"] },
        { id: "res-2", topicId: "sci-plants-1", title: "Grade 6 Science: Plant Biology Worksheet", type: "worksheet", date: daysAgo(2), content: "Worksheet for labeling plant parts...", tags: ["science", "grade6"] },
        { id: "res-3", topicId: "admin-report-1", title: "Term 1 Class Performance Report", type: "report", date: daysAgo(1), content: "Comprehensive report on class performance...", tags: ["admin", "report"] },
    ];

    // --- 5. Notifications ---
    const notifications: StudentNotification[] = [
        { id: "n-1", studentId: "teacher-1", type: "alert", title: "Gap Detected: Grade 5 Math", message: "60% of students failed the recent Fractions quiz.", date: daysAgo(0), read: false },
        { id: "n-2", studentId: "teacher-1", type: "system", title: "Report Ready", message: "Term 1 Report for Grade 6 is ready for review.", date: daysAgo(1), read: false },
        { id: "n-3", studentId: "teacher-1", type: "system", title: "Meeting Reminder", message: "Staff meeting tomorrow at 09:00 AM.", date: daysAgo(1), read: true },
        // Student Notifs
        { id: "n-4", studentId: "student-1", type: "assignment", title: "Math Homework", message: "Complete Sets Worksheet by Friday", date: daysAgo(0), read: false }
    ];

    // Write
    localStorage.setItem('motlatsi_admin_users', JSON.stringify(allUsers));
    localStorage.setItem('motlatsi_activity_log', JSON.stringify(logs));
    localStorage.setItem('motlatsi_schedule', JSON.stringify(schedule));
    localStorage.setItem('motlatsi_notifications', JSON.stringify(notifications));
    localStorage.setItem('motlatsi_library', JSON.stringify(libraryItems));
    localStorage.setItem('motlatsi_resources', JSON.stringify(resources));
    
    localStorage.setItem('motlatsi_data_version', CURRENT_VERSION);

    console.log("✅ Comprehensive Demo Data Seeded (All Roles Active)");
};
