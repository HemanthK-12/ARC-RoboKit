import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc} from "firebase/firestore"; 
import dotenv from 'dotenv';
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SEND_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const query=await getDocs(collection(db,"users"));
console.log(query)
query.forEach
(
  (docs)=>
  {
    console.log(docs.id,"=>",docs.data());
  }
);

const inventoryData = 
[
  {
    "category": "Sensor",
    "description": "IR good for detection and in bot movements",
    "imageUrl": "https://www.tomsonelectronics.com/products/ir-proximity-sensor-module",
    "isLowStock": false,
    "name": "INFRARED SENSOR",
    "quantity": 5
  },
  {
    "category": "Sensor",
    "description": "Used for distance measurement",
    "imageUrl": "https://www.tomsonelectronics.com/products/hc-sr04-ultrasonic-sensor",
    "isLowStock": true,
    "name": "ULTRASONIC SENSOR",
    "quantity": 2
  },
  {
    "category": "Sensor",
    "description": "Detects changes in light intensity",
    "imageUrl": "https://www.tomsonelectronics.com/products/ldr-light-sensor",
    "isLowStock": false,
    "name": "LDR LIGHT SENSOR",
    "quantity": 8
  },
  {
    "category": "Motor",
    "description": "High torque motor for robotic applications",
    "imageUrl": "https://www.tomsonelectronics.com/products/12v-dc-motor",
    "isLowStock": false,
    "name": "DC MOTOR",
    "quantity": 12
  },
  {
    "category": "Motor",
    "description": "Precise angular movement motor",
    "imageUrl": "https://www.tomsonelectronics.com/products/mg995-servo-motor",
    "isLowStock": true,
    "name": "SERVO MOTOR",
    "quantity": 3
  },
  {
    "category": "Motor",
    "description": "High RPM motor for small robots",
    "imageUrl": "https://www.tomsonelectronics.com/products/bo-motor",
    "isLowStock": false,
    "name": "BO MOTOR",
    "quantity": 10
  },
  {
    "category": "Microcontroller",
    "description": "Popular microcontroller board",
    "imageUrl": "https://www.tomsonelectronics.com/products/arduino-uno",
    "isLowStock": false,
    "name": "ARDUINO UNO",
    "quantity": 7
  },
  {
    "category": "Microcontroller",
    "description": "Single-board computer for robotics",
    "imageUrl": "https://www.tomsonelectronics.com/products/raspberry-pi-4",
    "isLowStock": true,
    "name": "RASPBERRY PI 4",
    "quantity": 1
  },
  {
    "category": "Battery",
    "description": "Rechargeable lithium-ion battery pack",
    "imageUrl": "https://www.tomsonelectronics.com/products/12v-li-ion-battery-pack",
    "isLowStock": false,
    "name": "12V LI-ION BATTERY PACK",
    "quantity": 6
  },
  {
    "category": "Battery",
    "description": "9V battery for powering small circuits",
    "imageUrl": "https://www.tomsonelectronics.com/products/9v-battery",
    "isLowStock": true,
    "name": "9V BATTERY",
    "quantity": 2
  },
  {
    "category": "Battery",
    "description": "Powerful LiPo battery for drones",
    "imageUrl": "https://www.tomsonelectronics.com/products/lipo-battery-11-1v",
    "isLowStock": false,
    "name": "11.1V LiPo BATTERY",
    "quantity": 9
  },
  {
    "category": "Controller",
    "description": "Motor driver for controlling DC motors",
    "imageUrl": "https://www.tomsonelectronics.com/products/l298n-motor-driver",
    "isLowStock": true,
    "name": "L298N MOTOR DRIVER",
    "quantity": 3
  },
  {
    "category": "Controller",
    "description": "Electronic speed controller for brushless motors",
    "imageUrl": "https://www.tomsonelectronics.com/products/30a-esc",
    "isLowStock": false,
    "name": "30A ESC",
    "quantity": 11
  },
  {
    "category": "Communication",
    "description": "Bluetooth module for wireless communication",
    "imageUrl": "https://www.tomsonelectronics.com/products/hc-05-bluetooth-module",
    "isLowStock": false,
    "name": "HC-05 BLUETOOTH MODULE",
    "quantity": 4
  },
  {
    "category": "Communication",
    "description": "WiFi module for IoT applications",
    "imageUrl": "https://www.tomsonelectronics.com/products/esp8266-wifi-module",
    "isLowStock": true,
    "name": "ESP8266 WiFi MODULE",
    "quantity": 2
  }
]

const updateInventoryWithAvailableQuantity = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    
    const updatePromises = querySnapshot.docs.map(async (document) => {
      const docRef = doc(db, "inventory", document.id);
      const currentData = document.data();
      
      // Set availableQuantity equal to quantity if it doesn't exist
      if (!currentData.availableQuantity) {
        await updateDoc(docRef, {
          availableQuantity: currentData.quantity
        });
        console.log(`Updated document ${document.id} with availableQuantity: ${currentData.quantity}`);
      }
    });

    await Promise.all(updatePromises);
    console.log("All documents updated successfully");
  } catch (error) {
    console.error("Error updating documents:", error);
  }
};

updateInventoryWithAvailableQuantity();
// const uploadData = async () => {
//   for (const item of inventoryData) {
//       await addDoc(collection(db, "inventory"), item);
//       console.log("Added:", item);
//   }
// };

// uploadData();