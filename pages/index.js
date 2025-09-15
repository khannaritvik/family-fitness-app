import React, { useState, useEffect } from 'react';
import { Calendar, Activity, Heart, TrendingDown, Plus, X, Check, AlertCircle, ChevronDown, ChevronUp, Clock, Dumbbell, Apple, User, Package, Utensils, LineChart, Save, Cloud, CloudOff } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FamilyFitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('ritvik');
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [weightDate, setWeightDate] = useState(new Date().toISOString().split('T')[0]);
  const [weightHistory, setWeightHistory] = useState({
    ritvik: [],
    lovely: [],
    anu: []
  });
  const [expandedSections, setExpandedSections] = useState({});
  const [cloudSync, setCloudSync] = useState(false);
  const [supabaseConfig, setSupabaseConfig] = useState({ url: '', key: '' });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (weightHistory.ritvik.length > 0 || weightHistory.lovely.length > 0 || weightHistory.anu.length > 0) {
      saveData();
    }
  }, [weightHistory]);

  const loadData = async () => {
    // Try cloud first, then localStorage
    const cloudConfig = localStorage.getItem('supabaseConfig');
    if (cloudConfig) {
      const config = JSON.parse(cloudConfig);
      setSupabaseConfig(config);
      // Here you would load from Supabase
      // For now, falling back to localStorage
    }
    
    const savedHistory = localStorage.getItem('familyWeightHistory');
    if (savedHistory) {
      setWeightHistory(JSON.parse(savedHistory));
    }
  };

  const saveData = async () => {
    // Save to localStorage
    localStorage.setItem('familyWeightHistory', JSON.stringify(weightHistory));
    
    // If cloud sync is enabled, save to cloud
    if (cloudSync && supabaseConfig.url && supabaseConfig.key) {
      // Here you would save to Supabase
      console.log('Saving to cloud...');
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const familyMembers = {
    ritvik: {
      name: 'Ritvik',
      currentWeight: 89,
      targetWeight: 81,
      color: 'bg-blue-500',
      icon: '💪',
      goals: 'Aggressive fat loss, muscle preservation',
      restrictions: 'No meat/eggs Tue & Sat'
    },
    lovely: {
      name: 'Lovely (Dad)',
      currentWeight: 104,
      targetWeight: 95,
      color: 'bg-green-500',
      icon: '❤️',
      goals: 'Heart health, cholesterol reduction',
      restrictions: 'No eggs (allergy), vegetarian Tuesdays'
    },
    anu: {
      name: 'Anu (Mom)',
      currentWeight: 75,
      targetWeight: 72,
      color: 'bg-purple-500',
      icon: '🌸',
      goals: 'Blood sugar control, gut health',
      restrictions: 'Vegetarian Tuesdays, UC-friendly'
    }
  };

  // Updated workout plans - synchronized schedules
  const workoutPlans = {
    ritvik: {
      schedule: 'Monday, Wednesday, Friday, Saturday',
      workouts: {
        monday: {
          name: 'Upper Body & Stair Master',
          exercises: [
            { name: 'Stair Master Warm-up', sets: 1, reps: '10 min', rest: '0', intensity: 'Level 5' },
            { name: 'Incline Dumbbell Press', sets: 4, reps: '8-12', rest: '90 sec', weight: '25-30 kg' },
            { name: 'Flat Dumbbell Press', sets: 3, reps: '8-12', rest: '75 sec', weight: '22-27 kg' },
            { name: 'Incline Dumbbell Flyes', sets: 3, reps: '10-15', rest: '60 sec', weight: '12-15 kg' },
            { name: 'Cable Crossovers', sets: 3, reps: '12-15', rest: '45 sec', weight: '15-20 kg' },
            { name: 'Push-up Variations', sets: 3, reps: 'To failure', rest: '60 sec', weight: 'Bodyweight' },
            { name: 'Stair Master Cardio', sets: 1, reps: '20-30 min', rest: '0', intensity: 'Level 6-7' }
          ]
        },
        wednesday: {
          name: 'Core & HIIT',
          exercises: [
            { name: 'Stair Master Intervals', sets: 8, reps: '2 min hard, 1 min easy', rest: '0', intensity: 'Level 8/4' },
            { name: 'Weighted Planks', sets: 3, reps: '30-60 sec', rest: '60 sec', weight: '10-20 kg plate' },
            { name: 'Cable Wood Chops', sets: 3, reps: '12 each side', rest: '45 sec', weight: '15-20 kg' },
            { name: 'Hanging Leg Raises', sets: 3, reps: '10-15', rest: '60 sec', weight: 'Bodyweight' },
            { name: 'Ab Wheel Rollouts', sets: 3, reps: '8-12', rest: '60 sec', weight: 'Bodyweight' },
            { name: 'Russian Twists', sets: 3, reps: '20', rest: '45 sec', weight: '10-15 kg' }
          ]
        },
        friday: {
          name: 'Full Body Strength',
          exercises: [
            { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '120 sec', weight: '60-80 kg' },
            { name: 'Pull-ups/Lat Pulldown', sets: 4, reps: '8-12', rest: '90 sec', weight: 'BW or 50-60 kg' },
            { name: 'Shoulder Press', sets: 3, reps: '8-12', rest: '75 sec', weight: '20-25 kg' },
            { name: 'Barbell Rows', sets: 3, reps: '10-12', rest: '75 sec', weight: '40-50 kg' },
            { name: 'Leg Press', sets: 3, reps: '12-15', rest: '90 sec', weight: '100-120 kg' },
            { name: 'Stair Master Steady', sets: 1, reps: '30-40 min', rest: '0', intensity: 'Level 6' }
          ]
        },
        saturday: {
          name: 'Chest Focus & Endurance',
          exercises: [
            { name: 'Barbell Bench Press', sets: 4, reps: '6-10', rest: '120 sec', weight: '50-60 kg' },
            { name: 'Dumbbell Pullovers', sets: 3, reps: '12-15', rest: '60 sec', weight: '15-20 kg' },
            { name: 'Decline Push-ups', sets: 3, reps: '15-20', rest: '60 sec', weight: 'Bodyweight' },
            { name: 'Pec Deck/Flyes', sets: 3, reps: '15-20', rest: '45 sec', weight: '30-40 kg' },
            { name: 'Stair Master Endurance', sets: 1, reps: '45-60 min', rest: '0', intensity: 'Level 5-6' }
          ]
        }
      }
    },
    lovely: {
      schedule: 'Monday, Wednesday, Friday (with Anu)',
      workouts: {
        monday: {
          name: 'Circuit Training A',
          exercises: [
            { name: 'Walking Warm-up', sets: 1, reps: '5 min', rest: '0', intensity: 'Easy pace' },
            { name: 'Seated Chest Press', sets: 2, reps: '12-15', rest: '60 sec', weight: '8-12 kg' },
            { name: 'Seated Row', sets: 2, reps: '12-15', rest: '60 sec', weight: '12-18 kg' },
            { name: 'Leg Press', sets: 2, reps: '12-15', rest: '90 sec', weight: '30-40 kg' },
            { name: 'Lat Pulldown', sets: 2, reps: '12-15', rest: '60 sec', weight: '15-20 kg' },
            { name: 'Modified Yoga', sets: 1, reps: '10 min', rest: '0', intensity: 'Gentle' },
            { name: 'Stationary Bike', sets: 1, reps: '15 min', rest: '0', intensity: 'Moderate' }
          ]
        },
        wednesday: {
          name: 'Core & Balance',
          exercises: [
            { name: 'Recumbent Bike Warm-up', sets: 1, reps: '5 min', rest: '0', intensity: 'Easy' },
            { name: 'Standing Balance', sets: 3, reps: '30 sec each leg', rest: '30 sec', weight: 'Bodyweight' },
            { name: 'Seated Core Twists', sets: 2, reps: '10 each side', rest: '45 sec', weight: '2-3 kg' },
            { name: 'Wall Sits', sets: 2, reps: '20-30 sec', rest: '60 sec', weight: 'Bodyweight' },
            { name: 'Arm Raises', sets: 2, reps: '12-15', rest: '45 sec', weight: '2-3 kg' },
            { name: 'Chair Yoga', sets: 1, reps: '15 min', rest: '0', intensity: 'Gentle' },
            { name: 'Walking', sets: 1, reps: '15 min', rest: '0', intensity: 'Comfortable' }
          ]
        },
        friday: {
          name: 'Full Body Light',
          exercises: [
            { name: 'Treadmill Walk', sets: 1, reps: '10 min', rest: '0', intensity: '3-3.5 km/h' },
            { name: 'Machine Circuit', sets: 2, reps: '10-12 each', rest: '30 sec between', weight: 'Light' },
            { name: 'Resistance Bands', sets: 2, reps: '12-15', rest: '60 sec', weight: 'Light band' },
            { name: 'Seated Leg Curls', sets: 2, reps: '12-15', rest: '60 sec', weight: '10-15 kg' },
            { name: 'Stretching Routine', sets: 1, reps: '15 min', rest: '0', intensity: 'Gentle' },
            { name: 'Cool-down Walk', sets: 1, reps: '10 min', rest: '0', intensity: 'Easy' }
          ]
        }
      }
    },
    anu: {
      schedule: 'Monday, Wednesday, Friday (with Lovely)',
      workouts: {
        monday: {
          name: 'Circuit Training A',
          exercises: [
            { name: 'Walking Warm-up', sets: 1, reps: '5 min', rest: '0', intensity: 'Easy pace' },
            { name: 'Seated Chest Press', sets: 2, reps: '12-15', rest: '60 sec', weight: '5-8 kg' },
            { name: 'Seated Row', sets: 2, reps: '12-15', rest: '60 sec', weight: '10-15 kg' },
            { name: 'Leg Press', sets: 2, reps: '12-15', rest: '90 sec', weight: '25-35 kg' },
            { name: 'Lat Pulldown', sets: 2, reps: '12-15', rest: '60 sec', weight: '12-18 kg' },
            { name: 'Modified Yoga', sets: 1, reps: '10 min', rest: '0', intensity: 'Gentle' },
            { name: 'Stationary Bike', sets: 1, reps: '15 min', rest: '0', intensity: 'Light-Moderate' }
          ]
        },
        wednesday: {
          name: 'Core & Balance',
          exercises: [
            { name: 'Recumbent Bike Warm-up', sets: 1, reps: '5 min', rest: '0', intensity: 'Easy' },
            { name: 'Standing Balance', sets: 3, reps: '30 sec each leg', rest: '30 sec', weight: 'Bodyweight' },
            { name: 'Seated Core Twists', sets: 2, reps: '10 each side', rest: '45 sec', weight: '2-3 kg' },
            { name: 'Wall Sits', sets: 2, reps: '15-25 sec', rest: '60 sec', weight: 'Bodyweight' },
            { name: 'Arm Raises', sets: 2, reps: '10-12', rest: '45 sec', weight: '1-2 kg' },
            { name: 'Chair Yoga', sets: 1, reps: '15 min', rest: '0', intensity: 'Gentle' },
            { name: 'Walking', sets: 1, reps: '15 min', rest: '0', intensity: 'Comfortable' }
          ]
        },
        friday: {
          name: 'Full Body Light',
          exercises: [
            { name: 'Treadmill Walk', sets: 1, reps: '10 min', rest: '0', intensity: '3-3.5 km/h' },
            { name: 'Machine Circuit', sets: 2, reps: '10-12 each', rest: '30 sec between', weight: 'Light' },
            { name: 'Resistance Bands', sets: 2, reps: '10-12', rest: '60 sec', weight: 'Light band' },
            { name: 'Seated Leg Curls', sets: 2, reps: '12-15', rest: '60 sec', weight: '8-12 kg' },
            { name: 'Stretching Routine', sets: 1, reps: '15 min', rest: '0', intensity: 'Gentle' },
            { name: 'Cool-down Walk', sets: 1, reps: '10 min', rest: '0', intensity: 'Easy' }
          ]
        }
      }
    }
  };

  // Synchronized diet plans for parents
  const dietPlans = {
    ritvik: {
      calories: '1,200-1,400 per day',
      window: '1:00 PM - 8:00 PM',
      meals: {
        '1:00 PM - Meal 1': {
          items: [
            { food: 'Grilled Chicken Breast', quantity: '150g (1 medium piece)', calories: 165, protein: 31 },
            { food: 'Quinoa (cooked)', quantity: '1/2 cup (92g)', calories: 111, protein: 4 },
            { food: 'Mixed Vegetables (steamed)', quantity: '1.5 cups', calories: 60, protein: 3 },
            { food: 'Olive Oil', quantity: '1 tsp', calories: 40, protein: 0 },
            { food: 'Total', quantity: '', calories: 376, protein: 38 }
          ]
        },
        '4:00 PM - Protein Snack': {
          items: [
            { food: 'Greek Yogurt (non-fat)', quantity: '1 cup (245g)', calories: 130, protein: 23 },
            { food: 'Whey Protein Powder', quantity: '1/2 scoop (15g)', calories: 60, protein: 12 },
            { food: 'Almonds', quantity: '10 pieces', calories: 70, protein: 3 },
            { food: 'Total', quantity: '', calories: 260, protein: 38 }
          ]
        },
        '7:30 PM - Dinner': {
          items: [
            { food: 'Fish (Salmon/Mackerel)', quantity: '120g', calories: 250, protein: 25 },
            { food: 'Brown Rice (cooked)', quantity: '1/3 cup (65g)', calories: 72, protein: 2 },
            { food: 'Spinach (sautéed)', quantity: '2 cups raw → 1/2 cup cooked', calories: 20, protein: 2 },
            { food: 'Mixed Dal', quantity: '1/2 cup (120ml)', calories: 100, protein: 7 },
            { food: 'Total', quantity: '', calories: 442, protein: 36 }
          ]
        }
      }
    },
    lovely: {
      calories: '1,400-1,600 per day',
      window: '11:00 AM - 8:00 PM',
      meals: {
        '11:00 AM - Breakfast': {
          items: [
            { food: 'Steel-cut Oats (dry)', quantity: '1/3 cup (30g)', calories: 110, protein: 4 },
            { food: 'Chopped Almonds', quantity: '2 tbsp (14g)', calories: 82, protein: 3 },
            { food: 'Ground Flaxseed', quantity: '1 tbsp', calories: 37, protein: 1 },
            { food: 'Cinnamon', quantity: '1/2 tsp', calories: 3, protein: 0 },
            { food: 'Green Tea', quantity: '1 cup', calories: 2, protein: 0 },
            { food: 'Total', quantity: '', calories: 234, protein: 8 }
          ]
        },
        '2:00 PM - Lunch': {
          items: [
            { food: 'Brown Rice (cooked)', quantity: '3/4 cup (140g)', calories: 162, protein: 3 },
            { food: 'Moong Dal (cooked)', quantity: '1 cup (200g)', calories: 212, protein: 14 },
            { food: 'Mixed Vegetables', quantity: '1.5 cups', calories: 60, protein: 3 },
            { food: 'Low-fat Yogurt', quantity: '1/2 cup (120g)', calories: 60, protein: 6 },
            { food: 'Total', quantity: '', calories: 494, protein: 26 }
          ]
        },
        '5:00 PM - Snack': {
          items: [
            { food: 'Apple (medium)', quantity: '1 whole', calories: 95, protein: 0 },
            { food: 'Walnuts', quantity: '5 halves (14g)', calories: 92, protein: 2 },
            { food: 'Total', quantity: '', calories: 187, protein: 2 }
          ]
        },
        '8:00 PM - Dinner': {
          items: [
            { food: 'Grilled Fish', quantity: '100g', calories: 206, protein: 22 },
            { food: 'Quinoa (cooked)', quantity: '1/2 cup (92g)', calories: 111, protein: 4 },
            { food: 'Steamed Broccoli', quantity: '1 cup', calories: 55, protein: 4 },
            { food: 'Mixed Green Salad', quantity: '2 cups', calories: 20, protein: 2 },
            { food: 'Olive Oil (for salad)', quantity: '2 tsp', calories: 80, protein: 0 },
            { food: 'Total', quantity: '', calories: 472, protein: 32 }
          ]
        }
      }
    },
    anu: {
      calories: '1,300-1,500 per day',
      window: '11:00 AM - 8:00 PM',
      meals: {
        '11:00 AM - Breakfast': {
          items: [
            { food: 'Steel-cut Oats (dry)', quantity: '1/3 cup (30g)', calories: 110, protein: 4 },
            { food: 'Ground Cinnamon', quantity: '1/2 tsp', calories: 3, protein: 0 },
            { food: 'Chopped Walnuts', quantity: '1 tbsp (7g)', calories: 46, protein: 1 },
            { food: 'Blueberries', quantity: '1/4 cup (37g)', calories: 21, protein: 0 },
            { food: 'Herbal Tea', quantity: '1 cup', calories: 2, protein: 0 },
            { food: 'Total', quantity: '', calories: 182, protein: 5 }
          ]
        },
        '2:00 PM - Lunch': {
          items: [
            { food: 'Brown Rice (cooked)', quantity: '2/3 cup (123g)', calories: 144, protein: 3 },
            { food: 'Turmeric Dal (cooked)', quantity: '1 cup (200g)', calories: 212, protein: 14 },
            { food: 'Bottle Gourd Sabzi', quantity: '1 cup', calories: 40, protein: 2 },
            { food: 'Probiotic Yogurt', quantity: '1/2 cup (120g)', calories: 60, protein: 6 },
            { food: 'Total', quantity: '', calories: 456, protein: 25 }
          ]
        },
        '5:00 PM - Snack': {
          items: [
            { food: 'Cucumber Slices', quantity: '1 cup', calories: 16, protein: 1 },
            { food: 'Hummus', quantity: '2 tbsp (30g)', calories: 70, protein: 2 },
            { food: 'Green Tea', quantity: '1 cup', calories: 2, protein: 0 },
            { food: 'Total', quantity: '', calories: 88, protein: 3 }
          ]
        },
        '8:00 PM - Dinner': {
          items: [
            { food: 'Mixed Vegetable Curry', quantity: '1.5 cups', calories: 150, protein: 5 },
            { food: 'Quinoa (cooked)', quantity: '1/2 cup (92g)', calories: 111, protein: 4 },
            { food: 'Spinach Raita', quantity: '1/2 cup', calories: 40, protein: 3 },
            { food: 'Cooked Moong Dal', quantity: '1/2 cup', calories: 106, protein: 7 },
            { food: 'Total', quantity: '', calories: 407, protein: 19 }
          ]
        }
      }
    }
  };

  // Diet alternatives
  const dietAlternatives = {
    breakfast: {
      vegetarian: [
        { name: 'Moong Dal Chilla', quantity: '2 medium (100g batter)', calories: 180, protein: 12 },
        { name: 'Vegetable Upma', quantity: '1 cup (200g)', calories: 195, protein: 6 },
        { name: 'Sprouted Moong Salad', quantity: '1.5 cups', calories: 160, protein: 11 },
        { name: 'Besan Cheela', quantity: '2 small (80g batter)', calories: 170, protein: 10 },
        { name: 'Quinoa Khichdi', quantity: '1 cup (210g)', calories: 220, protein: 8 },
        { name: 'Oats Idli', quantity: '3 pieces', calories: 180, protein: 7 }
      ],
      nonVegetarian: [
        { name: 'Egg White Omelette', quantity: '3 whites + veggies', calories: 90, protein: 15 },
        { name: 'Scrambled Eggs', quantity: '2 whole eggs', calories: 140, protein: 12 },
        { name: 'Chicken Sandwich', quantity: '2 slices whole wheat', calories: 280, protein: 25 },
        { name: 'Tuna Salad Bowl', quantity: '1.5 cups', calories: 250, protein: 30 },
        { name: 'Egg Bhurji', quantity: '2 eggs + veggies', calories: 180, protein: 14 },
        { name: 'Smoked Salmon Toast', quantity: '1 slice + 50g salmon', calories: 190, protein: 18 }
      ]
    },
    lunch: {
      vegetarian: [
        { name: 'Rajma-Rice', quantity: '1 cup each', calories: 380, protein: 15 },
        { name: 'Chole-Quinoa Bowl', quantity: '1.5 cups total', calories: 360, protein: 16 },
        { name: 'Palak Paneer + Roti', quantity: '1 cup + 2 rotis', calories: 400, protein: 18 },
        { name: 'Mixed Dal Khichdi', quantity: '1.5 cups', calories: 320, protein: 14 },
        { name: 'Tofu Stir-fry + Rice', quantity: '150g tofu + 1/2 cup rice', calories: 350, protein: 20 },
        { name: 'Soybean Curry + Rice', quantity: '1 cup each', calories: 380, protein: 22 }
      ],
      nonVegetarian: [
        { name: 'Chicken Biryani', quantity: '1.5 cups', calories: 420, protein: 28 },
        { name: 'Fish Curry + Rice', quantity: '100g fish + 3/4 cup rice', calories: 380, protein: 26 },
        { name: 'Grilled Chicken Salad', quantity: '2 cups', calories: 320, protein: 35 },
        { name: 'Egg Curry + Quinoa', quantity: '2 eggs + 1/2 cup quinoa', calories: 360, protein: 20 },
        { name: 'Chicken Tikka + Naan', quantity: '150g + 1 small naan', calories: 400, protein: 32 },
        { name: 'Prawn Stir-fry + Rice', quantity: '100g prawns + 1/2 cup rice', calories: 340, protein: 24 }
      ]
    },
    snacks: {
      vegetarian: [
        { name: 'Roasted Chickpeas', quantity: '1/3 cup (40g)', calories: 130, protein: 6 },
        { name: 'Protein Smoothie', quantity: '300ml', calories: 180, protein: 20 },
        { name: 'Mixed Nuts', quantity: '30g mix', calories: 170, protein: 5 },
        { name: 'Cottage Cheese Bowl', quantity: '100g + veggies', calories: 120, protein: 14 },
        { name: 'Hummus + Veggies', quantity: '3 tbsp + 1 cup veggies', calories: 150, protein: 5 },
        { name: 'Greek Yogurt Parfait', quantity: '150g yogurt + berries', calories: 160, protein: 18 }
      ],
      nonVegetarian: [
        { name: 'Boiled Eggs', quantity: '2 whole eggs', calories: 140, protein: 12 },
        { name: 'Chicken Salad Cup', quantity: '100g', calories: 165, protein: 25 },
        { name: 'Tuna + Crackers', quantity: '1 can + 5 crackers', calories: 200, protein: 20 },
        { name: 'Turkey Roll-ups', quantity: '3 rolls', calories: 150, protein: 18 },
        { name: 'Protein Shake', quantity: '1 scoop + water', calories: 120, protein: 24 },
        { name: 'Smoked Fish', quantity: '50g', calories: 90, protein: 15 }
      ]
    },
    dinner: {
      vegetarian: [
        { name: 'Paneer Tikka + Salad', quantity: '150g paneer', calories: 380, protein: 22 },
        { name: 'Dal Makhani + Roti', quantity: '1 cup + 2 rotis', calories: 420, protein: 16 },
        { name: 'Vegetable Biryani', quantity: '1.5 cups', calories: 340, protein: 10 },
        { name: 'Mushroom Curry + Rice', quantity: '1 cup each', calories: 320, protein: 8 },
        { name: 'Soy Chunks Masala', quantity: '1.5 cups', calories: 280, protein: 25 },
        { name: 'Mixed Veg Pulao', quantity: '1.5 cups', calories: 300, protein: 9 }
      ],
      nonVegetarian: [
        { name: 'Grilled Fish + Veggies', quantity: '150g fish', calories: 280, protein: 35 },
        { name: 'Chicken Stew + Bread', quantity: '1.5 cups + 1 slice', calories: 360, protein: 30 },
        { name: 'Tandoori Chicken', quantity: '2 pieces (200g)', calories: 320, protein: 38 },
        { name: 'Fish Tikka + Salad', quantity: '150g fish', calories: 260, protein: 32 },
        { name: 'Egg Drop Soup', quantity: '2 cups', calories: 180, protein: 14 },
        { name: 'Chicken Shawarma Bowl', quantity: '1 large bowl', calories: 380, protein: 35 }
      ]
    }
  };

  // Enhanced supplement schedule with brands
  const supplementSchedule = {
    ritvik: {
      core: [
        { name: 'L-Carnitine (Carnipure)', dose: '2g', timing: 'Pre-workout + Morning', brand: 'Allmax Nutrition' },
        { name: 'EAA/BCAA', dose: '10g', timing: '30 min pre-workout', brand: 'PVL Labs (current)' },
        { name: 'Berberine', dose: '500mg x3', timing: 'With meals', brand: 'Thorne Research' },
        { name: 'Fish Oil (Omega-3)', dose: '2g EPA+DHA', timing: 'With dinner', brand: 'NutraSea or Webber Naturals' },
        { name: 'D3/K2 Drops', dose: '2000 IU + 120mcg', timing: 'With fat meal', brand: 'CanPrev (current)' },
        { name: 'Ashwagandha KSM-66', dose: '600mg', timing: 'Before bed', brand: 'NOW Foods' },
        { name: 'Curcumin (95% extract)', dose: '500mg', timing: 'With dinner', brand: 'AOR or Natural Factors' },
        { name: 'Green Tea Extract (EGCG)', dose: '400mg', timing: 'Morning', brand: 'NOW Foods' },
        { name: 'HMB', dose: '3g', timing: 'Divided doses', brand: 'Optimum Nutrition' }
      ],
      optional: [
        { name: 'Yohimbine HCl', dose: '5-10mg', timing: 'Fasted cardio only', brand: 'PrimaForce' },
        { name: 'CLA (Conjugated Linoleic Acid)', dose: '3-6g', timing: 'With meals', brand: 'Allmax Nutrition' },
        { name: 'Forskolin', dose: '250-500mg', timing: 'Morning', brand: 'NOW Foods' },
        { name: 'Caffeine Pills', dose: '200mg', timing: 'Pre-workout', brand: 'Allmax Nutrition' },
        { name: 'Chromium Picolinate', dose: '200-400mcg', timing: 'With carb meals', brand: 'NOW Foods' },
        { name: 'Garcinia Cambogia', dose: '500-1000mg', timing: 'Before meals', brand: 'Purely Inspired' },
        { name: 'Raspberry Ketones', dose: '100-200mg', timing: 'Morning', brand: 'Webber Naturals' }
      ]
    },
    lovely: {
      core: [
        { name: 'Omega-3 Fish Oil', dose: '4g (2g EPA+DHA)', timing: 'Split AM/PM', brand: 'Webber Naturals Triple Strength' },
        { name: 'Ubiquinol (CoQ10)', dose: '200mg', timing: 'With breakfast', brand: 'Natural Factors or AOR' },
        { name: 'Plant Sterols', dose: '2g', timing: 'With main meals', brand: 'Webber Naturals' },
        { name: 'Aged Garlic Extract', dose: '1200mg', timing: 'Split doses', brand: 'Kyolic' },
        { name: 'Magnesium Glycinate', dose: '400mg', timing: 'Before bed', brand: 'CanPrev or Pure Encapsulations' }
      ],
      optional: [
        { name: 'Red Yeast Rice', dose: '1200mg', timing: 'With dinner', brand: 'Natural Factors' },
        { name: 'Bergamot Extract', dose: '500-1000mg', timing: 'Morning', brand: 'Jarrow Formulas' },
        { name: 'Niacin (B3)', dose: '500mg', timing: 'With food', brand: 'NOW Foods' },
        { name: 'Hawthorn Berry', dose: '500mg', timing: 'Twice daily', brand: 'Nature\'s Way' },
        { name: 'Soluble Fiber (Psyllium)', dose: '5g', timing: 'With water before meals', brand: 'Metamucil' },
        { name: 'Vitamin E (Mixed Tocopherols)', dose: '400 IU', timing: 'With fat meal', brand: 'Natural Factors' }
      ]
    },
    anu: {
      core: [
        { name: 'VSL#3 Probiotic', dose: '450 billion CFU', timing: 'Empty stomach', brand: 'VSL#3 or Bio-K+' },
        { name: 'L-Glutamine', dose: '15g', timing: 'Split doses', brand: 'Thorne Research' },
        { name: 'Chromium Picolinate', dose: '400mcg', timing: 'With meals', brand: 'NOW Foods' },
        { name: 'Alpha-Lipoic Acid', dose: '600mg', timing: 'Split doses', brand: 'Doctor\'s Best' },
        { name: 'Cinnamon Extract', dose: '1-3g', timing: 'With breakfast', brand: 'NOW Foods Ceylon Cinnamon' },
        { name: 'Vitamin D3', dose: '2000-4000 IU', timing: 'With dinner', brand: 'Webber Naturals' },
        { name: 'High-EPA Omega-3', dose: '3-4g', timing: 'With meals', brand: 'Nordic Naturals EPA Xtra' }
      ],
      optional: [
        { name: 'Bitter Melon Extract', dose: '500mg', timing: 'Before meals', brand: 'Himalaya' },
        { name: 'Fenugreek Seed', dose: '500mg', timing: 'With meals', brand: 'Nature\'s Way' },
        { name: 'Gymnema Sylvestre', dose: '400mg', timing: 'Before meals', brand: 'NOW Foods' },
        { name: 'Berberine', dose: '500mg x3', timing: 'With meals', brand: 'Thorne Research' },
        { name: 'Turmeric + Black Pepper', dose: '500mg', timing: 'With meals', brand: 'AOR Curcumin Active' },
        { name: 'Slippery Elm', dose: '400mg', timing: 'Between meals', brand: 'Nature\'s Way' },
        { name: 'Aloe Vera Gel', dose: '50ml', timing: 'Morning', brand: 'Lily of the Desert' }
      ]
    }
  };

  const addWeight = () => {
    if (selectedMember && newWeight && weightDate) {
      const weightEntry = {
        date: weightDate,
        weight: parseFloat(newWeight),
        id: Date.now()
      };

      setWeightHistory(prev => ({
        ...prev,
        [selectedMember]: [...prev[selectedMember], weightEntry].sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        )
      }));

      setShowWeightModal(false);
      setNewWeight('');
      setWeightDate(new Date().toISOString().split('T')[0]);
    }
  };

  const deleteWeight = (member, id) => {
    setWeightHistory(prev => ({
      ...prev,
      [member]: prev[member].filter(entry => entry.id !== id)
    }));
  };

  const getLatestWeight = (member) => {
    const history = weightHistory[member];
    if (history && history.length > 0) {
      return history[history.length - 1].weight;
    }
    return familyMembers[member].currentWeight;
  };

  const getWeightProgress = (member) => {
    const current = getLatestWeight(member);
    const target = familyMembers[member].targetWeight;
    const start = familyMembers[member].currentWeight;
    const totalToLose = start - target;
    const lost = start - current;
    const percentage = totalToLose > 0 ? (lost / totalToLose) * 100 : 0;
    return Math.min(100, Math.max(0, percentage));
  };

  // Prepare chart data
  const getChartData = () => {
    const allDates = new Set();
    Object.values(weightHistory).forEach(history => {
      history.forEach(entry => allDates.add(entry.date));
    });
    
    const sortedDates = Array.from(allDates).sort();
    
    return sortedDates.map(date => {
      const dataPoint = { date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
      
      Object.keys(weightHistory).forEach(member => {
        const entry = weightHistory[member].find(e => e.date === date);
        dataPoint[member] = entry ? entry.weight : null;
      });
      
      return dataPoint;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="text-red-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Family Fitness Tracker</h1>
                <p className="text-sm text-gray-600">Khanna Family Health Journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {cloudSync ? (
                  <Cloud className="text-green-500" size={20} />
                ) : (
                  <CloudOff className="text-gray-400" size={20} />
                )}
                <span className="text-sm text-gray-600">
                  {cloudSync ? 'Cloud Sync On' : 'Local Storage'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(familyMembers).map(([key, member]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeTab === key 
                  ? `${member.color} text-white border-transparent` 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{member.icon}</span>
                <div className="text-right">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs opacity-90">
                    {getLatestWeight(key)} kg
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getWeightProgress(key)}%` }}
                />
              </div>
              <p className="text-xs mt-1 opacity-90">
                Target: {member.targetWeight} kg
              </p>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Workout Plan */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div 
                className="p-4 border-b cursor-pointer hover:bg-gray-50"
                onClick={() => toggleSection('workout')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="text-blue-500" size={20} />
                    <h2 className="font-semibold text-gray-900">Workout Plan</h2>
                  </div>
                  {expandedSections.workout ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Schedule: {workoutPlans[activeTab].schedule}
                </p>
              </div>
              
              {expandedSections.workout && (
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(workoutPlans[activeTab].workouts).map(([day, workout]) => (
                    <div key={day} className="border-l-4 border-blue-500 pl-3">
                      <h3 className="font-medium text-gray-900 capitalize mb-2">
                        {day}: {workout.name}
                      </h3>
                      <div className="space-y-1">
                        {workout.exercises.map((exercise, idx) => (
                          <div key={idx} className="text-sm">
                            <div className="flex justify-between items-start">
                              <span className="text-gray-700">{exercise.name}</span>
                              <span className="text-gray-500 text-xs">
                                {exercise.sets}×{exercise.reps}
                              </span>
                            </div>
                            {exercise.weight && (
                              <span className="text-xs text-gray-500">
                                Weight: {exercise.weight} | Rest: {exercise.rest}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Core Supplements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div 
                className="p-4 border-b cursor-pointer hover:bg-gray-50"
                onClick={() => toggleSection('supplements')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="text-green-500" size={20} />
                    <h2 className="font-semibold text-gray-900">Core Supplements</h2>
                  </div>
                  {expandedSections.supplements ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedSections.supplements && (
                <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                  {supplementSchedule[activeTab].core.map((supp, idx) => (
                    <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                      <div className="font-medium text-gray-700">{supp.name}</div>
                      <div className="text-xs text-gray-500">
                        {supp.dose} - {supp.timing}
                      </div>
                      <div className="text-xs text-blue-600 font-medium">
                        Brand: {supp.brand}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Supplements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div 
                className="p-4 border-b cursor-pointer hover:bg-gray-50"
                onClick={() => toggleSection('optionalSupplements')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="text-indigo-500" size={20} />
                    <h2 className="font-semibold text-gray-900">Optional Supplements</h2>
                  </div>
                  {expandedSections.optionalSupplements ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedSections.optionalSupplements && (
                <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                  {supplementSchedule[activeTab].optional.map((supp, idx) => (
                    <div key={idx} className="text-sm bg-indigo-50 p-2 rounded">
                      <div className="font-medium text-gray-700">{supp.name}</div>
                      <div className="text-xs text-gray-500">
                        {supp.dose} - {supp.timing}
                      </div>
                      <div className="text-xs text-indigo-600 font-medium">
                        Brand: {supp.brand}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Diet Plan & Alternatives */}
          <div className="lg:col-span-1 space-y-4">
            {/* Main Diet Plan */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div 
                className="p-4 border-b cursor-pointer hover:bg-gray-50"
                onClick={() => toggleSection('diet')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Apple className="text-orange-500" size={20} />
                    <h2 className="font-semibold text-gray-900">Diet Plan</h2>
                  </div>
                  {expandedSections.diet ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {dietPlans[activeTab].calories} | Window: {dietPlans[activeTab].window}
                </p>
              </div>
              
              {expandedSections.diet && (
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(dietPlans[activeTab].meals).map(([mealTime, meal]) => (
                    <div key={mealTime} className="border-l-4 border-orange-500 pl-3">
                      <h3 className="font-medium text-gray-900 mb-2">{mealTime}</h3>
                      <div className="space-y-1">
                        {meal.items.map((item, idx) => (
                          <div key={idx} className={`text-sm flex justify-between ${
                            item.food === 'Total' ? 'font-semibold border-t pt-1 mt-1' : ''
                          }`}>
                            <div className="flex-1">
                              <span className="text-gray-700">{item.food}</span>
                              {item.quantity && (
                                <span className="text-xs text-gray-500 ml-2">
                                  {item.quantity}
                                </span>
                              )}
                            </div>
                            <div className="text-right text-xs">
                              {item.calories && (
                                <span className="text-gray-600">{item.calories} cal</span>
                              )}
                              {item.protein && (
                                <span className="text-blue-600 ml-2">{item.protein}g</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Diet Alternatives */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div 
                className="p-4 border-b cursor-pointer hover:bg-gray-50"
                onClick={() => toggleSection('dietAlternatives')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Utensils className="text-purple-500" size={20} />
                    <h2 className="font-semibold text-gray-900">Diet Alternatives</h2>
                  </div>
                  {expandedSections.dietAlternatives ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedSections.dietAlternatives && (
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(dietAlternatives).map(([mealType, options]) => (
                    <div key={mealType}>
                      <h3 className="font-medium text-gray-900 capitalize mb-2">{mealType}</h3>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-green-700 mb-1">Vegetarian Options</h4>
                        <div className="space-y-1">
                          {options.vegetarian.map((item, idx) => (
                            <div key={idx} className="text-xs bg-green-50 p-1 rounded">
                              <div className="flex justify-between">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="text-gray-500">{item.calories}cal, {item.protein}g</span>
                              </div>
                              <span className="text-gray-500">{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {activeTab === 'ritvik' && (
                        <div>
                          <h4 className="text-sm font-medium text-blue-700 mb-1">Non-Vegetarian Options</h4>
                          <div className="space-y-1">
                            {options.nonVegetarian.map((item, idx) => (
                              <div key={idx} className="text-xs bg-blue-50 p-1 rounded">
                                <div className="flex justify-between">
                                  <span className="text-gray-700">{item.name}</span>
                                  <span className="text-gray-500">{item.calories}cal, {item.protein}g</span>
                                </div>
                                <span className="text-gray-500">{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Weight Tracker & Graph */}
          <div className="lg:col-span-1 space-y-4">
            {/* Weight Tracker */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="text-purple-500" size={20} />
                    <h2 className="font-semibold text-gray-900">Weight Tracker</h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMember(activeTab);
                      setShowWeightModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                  >
                    <Plus size={16} className="inline mr-1" />
                    Add
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">
                      {(familyMembers[activeTab].currentWeight - getLatestWeight(activeTab)).toFixed(1)} kg lost
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${familyMembers[activeTab].color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${getWeightProgress(activeTab)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Start: {familyMembers[activeTab].currentWeight} kg</span>
                    <span>Target: {familyMembers[activeTab].targetWeight} kg</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {weightHistory[activeTab]?.length > 0 ? (
                    weightHistory[activeTab].slice(-5).map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <div>
                          <span className="font-medium text-gray-900">{entry.weight} kg</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteWeight(activeTab, entry.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No weight entries yet. Click "Add" to start tracking.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Weight Progress Graph */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  <LineChart className="text-indigo-500" size={20} />
                  <h2 className="font-semibold text-gray-900">Weight Progress Chart</h2>
                </div>
              </div>
              
              <div className="p-4">
                {getChartData().length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsLineChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="ritvik" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6' }}
                        connectNulls
                        name="Ritvik"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lovely" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981' }}
                        connectNulls
                        name="Lovely"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anu" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={{ fill: '#8B5CF6' }}
                        connectNulls
                        name="Anu"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-8">
                    Add weight entries to see the progress chart
                  </p>
                )}
              </div>
            </div>

            {/* Member Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <User className="text-indigo-500" size={20} />
                  <h2 className="font-semibold text-gray-900">Profile</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Goals:</span>
                    <p className="text-gray-900">{familyMembers[activeTab].goals}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Dietary Restrictions:</span>
                    <p className="text-gray-900">{familyMembers[activeTab].restrictions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Storage Setup Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Cloud className="text-blue-600 mt-0.5" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-1">Cloud Storage Setup (Optional)</p>
              <p className="text-blue-800 mb-2">To sync data across devices, set up free Supabase:</p>
              <ol className="text-blue-700 space-y-1 list-decimal list-inside">
                <li>Create free account at supabase.com</li>
                <li>Create new project and table named 'family_fitness'</li>
                <li>Add environment variables to Vercel: SUPABASE_URL and SUPABASE_ANON_KEY</li>
                <li>Data will sync automatically across all devices</li>
              </ol>
              <p className="text-blue-600 mt-2">Currently using local browser storage (data saved on this device only)</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-yellow-900 mb-1">Family Coordination Notes</p>
              <ul className="text-yellow-800 space-y-1">
                <li>• Lovely & Anu: Same workout schedule (Mon/Wed/Fri) for joint sessions</li>
                <li>• Ritvik: Joins parents Mon/Wed/Fri, solo training Saturday</li>
                <li>• Tuesday/Saturday: Full family vegetarian days</li>
                <li>• Dinner at 8 PM: Family meal with individual portion adjustments</li>
                <li>• All supplements listed are available at Canadian pharmacies or health stores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Entry Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Weight Entry</h3>
              <button
                onClick={() => setShowWeightModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter weight"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={weightDate}
                  onChange={(e) => setWeightDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={addWeight}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Check size={16} className="inline mr-1" />
                  Save
                </button>
                <button
                  onClick={() => setShowWeightModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyFitnessTracker;