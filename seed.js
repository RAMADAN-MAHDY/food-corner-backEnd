// ملف البذور (Seeder) لبيانات قائمة الطعام
// يحتوي على كود لإضافة الفئات والوجبات إلى قاعدة البيانات

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Meal from './models/Meal.js';

// تحميل متغيرات البيئة من ملف .env
dotenv.config();

// بيانات الفئات الرئيسية
const categoriesData = [
    { name: 'بيتزا' },
    { name: 'باستا' },
    { name: 'سناكس' },
    { name: 'حلويات' },
    { name: 'مشروبات' }
];

// بيانات الوجبات
const mealsData = [
    // بيتزا
    { name: 'بيتزا مارجريتا', price: 85 },
    { name: 'بيتزا بيبروني', price: 100 },
    { name: 'بيتزا خضار', price: 90 },
    
    // باستا
    { name: 'سباجيتي بولونيز', price: 95 },
    { name: 'لازانيا', price: 110 },
    { name: 'فيتوتشيني ألفريدو', price: 105 },
    
    // سناكس
    { name: 'بطاطس ويدجز', price: 40 },
    { name: 'موتزاريلا ستكس', price: 60 },
    { name: 'حلقات بصل', price: 35 },
    
    // حلويات
    { name: 'تيراميسو', price: 75 },
    { name: 'كيك شوكولاتة', price: 55 },
    { name: 'تشيز كيك', price: 65 },
    
    // مشروبات
    { name: 'بيبسي', price: 20 },
    { name: 'عصير برتقال فريش', price: 35 },
    { name: 'مياه معدنية', price: 10 }
];

// دالة الاتصال بقاعدة البيانات
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
    } catch (error) {
        console.error('❌ فشل الاتصال بقاعدة البيانات:', error.message);
        process.exit(1);
    }
};

// دالة التنفيذ الرئيسية لملف البذور
const runSeeder = async () => {
    try {
        // الاتصال بقاعدة البيانات
        await connectDB();
        
        // بدء عملية معاملة (Transaction)
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            console.log('🚀 بدء عملية إضافة البيانات...');
            
            // أولاً: إضافة الفئات
            console.log('📁 بدء إضافة الفئات...');
            
            const categories = [];
            for (const categoryData of categoriesData) {
                // التحقق من عدم وجود الفئة بالفعل
                let category = await Category.findOne({ name: categoryData.name }).session(session);
                
                if (!category) {
                    // إنشاء فئة جديدة
                    category = await Category.create([categoryData], { session });
                    categories.push(category[0]);
                    console.log(`✅ تم إضافة الفئة: ${categoryData.name}`);
                } else {
                    categories.push(category);
                    console.log(`ℹ️ الفئة موجودة بالفعل: ${categoryData.name}`);
                }
            }
            
            // ثانياً: إضافة الوجبات
            console.log('🍽️ بدء إضافة الوجبات...');
            
            let mealIndex = 0;
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                
                // إضافة 3 وجبات لكل فئة
                for (let j = 0; j < 3; j++) {
                    const mealData = mealsData[mealIndex];
                    
                    // التحقق من عدم وجود الوجبة بالفعل
                    const existingMeal = await Meal.findOne({
                        name: mealData.name,
                        category: category._id
                    }).session(session);
                    
                    if (!existingMeal) {
                        // إنشاء وجبة جديدة مع ربطها بالفئة
                        await Meal.create([{
                            ...mealData,
                            category: category._id
                        }], { session });
                        console.log(`✅ تم إضافة الوجبة: ${mealData.name} - ${category.name}`);
                    } else {
                        console.log(`ℹ️ الوجبة موجودة بالفعل: ${mealData.name} - ${category.name}`);
                    }
                    
                    mealIndex++;
                }
            }
            
            // إتمام المعاملة
            await session.commitTransaction();
            session.endSession();
            
            console.log('🎉 تم إضافة جميع البيانات بنجاح!');
            process.exit(0);
            
        } catch (error) {
            // إلغاء المعاملة في حالة حدوث خطأ
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
        
    } catch (error) {
        console.error('❌ فشل عملية إضافة البيانات:', error.message);
        process.exit(1);
    }
};

// تشغيل دالة التنفيذ الرئيسية
runSeeder();