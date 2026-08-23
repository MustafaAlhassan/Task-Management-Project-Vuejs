import { createI18n } from "vue-i18n";

const messages = {
  en: {
    pageTitle: "Task Manager Tool",
    taskName: "Task Name",
    deadline: "Deadline",
    dateAdd: "Date Add",
    priority: "Priority",
    editTask: "Edit Task",
    add: "Add",
    selectPriority: "Select Priority",
    high: "High",
    medium: "Medium",
    low: "Low",
    execution: "Execution",
    noTasks: "No tasks found. Add a new task!",
    writeTaskError: "Please Write a Task!",
    choosePriorityError: "Please Choose a Priority!",
    successMessage: "Task Added Successfully!",
    addBtn: "Add",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Confirm Delete",
    confirmDeleteMessage: "Are you sure you want to delete this task?",
    darkMode: "Dark",
    lightMode: "Light",
  },
  ar: {
    pageTitle: "اداة ادارة المهام",
    taskName: "اسم المهمة",
    deadline: "الموعد النهائي",
    dateAdd: "تأريخ الأضافة",
    priority: "الأولوية",
    editTask: "تعديل المهمة",
    add: "إضافة",
    selectPriority: "اختر الأولوية",
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة",
    execution: "الإجراءات",
    noTasks: "لا توجد مهام. أضف مهمة جديدة!",
    writeTaskError: "يرجى كتابة اسم المهمة!",
    choosePriorityError: "يرجى اختيار الأولوية!",
    successMessage: "تمت إضافة المهمة بنجاح!",
    addBtn: "إضافة",
    save: "حفظ",
    cancel: "الغاء",
    delete: "حذف",
    confirmDelete: "تأكيد الحذف",
    confirmDeleteMessage: "هل انت متأكد من انك تريد حذف المهمة؟",
    darkMode: "داكن",
    lightMode: "فاتح",
  },
};

const savedLanguage = localStorage.getItem("user_lang") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: "en",
  messages,
});

export default i18n;
