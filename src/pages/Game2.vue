<template>
  <div class="p-6 text-center">
    <!-- ถ้าตอบผิดให้แสดงข้อความแทนคำถาม -->
     <transition name="fade-slide" mode="out-in">
     <div v-if="!showQuestion" :key="currentWrongIndex">
      <h2 class="text-xl font-bold mb-4">
        {{ wrong[currentWrongIndex].question }}
      </h2>
      <div class="space-y-2">
        <button
          v-for="(choice, index) in wrong[currentWrongIndex].choices"
          :key="index"
          @click="checkWrong(choice)"
          class="block w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {{ choice }}
        </button>
      </div>
    </div>
    
    <!-- แสดงคำถามถ้า showQuestion = true -->
    <div v-else :key="currentQuestionIndex">
      <h2 class="text-xl font-bold mb-4">
        {{ questions[currentQuestionIndex].question }}
      </h2>

      <div class="space-y-2">
        <button
          v-for="(choice, index) in questions[currentQuestionIndex].choices"
          :key="index"
          @click="checkAnswer(choice)"
          class="block w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {{ choice }}
        </button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const questions = ref([
  {
    question: 'เก่งนะเนี่ย',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'เราลองมาดูคำถามที่ลึกขึ้นหน่อยดีกว่า',
    choices: ['->'],
    answer: '->',
  },
   {
    question: 'คุณชื่ออะไร',
    choices: ['ภัทราวดี', 'เนติลักษณ์', 'สยามจอน'],
    answer: 'ภัทราวดี',
  },
    {
    question: 'ถ้าให้เลือกเสื้อสีเดียวตลอดชีวิตจะเลือกสีอะไร',
    choices: ['ขาว', 'ดำ'],
    answer: 'ขาว' ,
  },
  {
    question: '9 พ.ย. 2547',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'คุณคุ้นๆกับวันที่เมื่อกี้มั้ย',
    choices: ['คุ้นๆอยู่', 'ไม่เลย'],
    answer: 'คุ้นๆอยู่',
  },
  {
    question: 'มันคือวันอะไร',
    choices: ['วันเกิด', 'ก็แค่วันธรรมดาทั่วไป'],
    answer: 'วันเกิด',
  },
  {
    question: 'จริงหรอ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'สุขสันต์เกิดนะ ภัทราวดี',
    choices: ['->'],
    answer: '->',
  },
])

const wrong = ref([
  {
    question: 'คุณชื่อนี้จริงๆหรอ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'คุณชื่อนี้จริงๆหรอ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'คุณชื่อนี้จริงๆหรอ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'คุณชื่อนี้จริงๆหรอ',
    choices: ['->'],
    answer: '->',
  },
   {
    question: 'ไม่คุ้นเลยหรอ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'มันก็แค่วันธรรมดาจริงหรอ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'แน่ใจหรอ',
    choices: ['->'],
    answer: '->',
  },  
  {
    question: 'ลองคิดดูใหม่สิ',
    choices: ['->'],
    answer: '->',
  },
 
])

const currentWrongIndex = ref(0)
const currentQuestionIndex = ref(0)
const showQuestion = ref(true) // ถ้า false จะซ่อนคำถามและโชว์ข้อความผิด
const router = useRouter()

// ตรวจคำตอบ
const checkAnswer = (choice) => {
  const correctAnswer = questions.value[currentQuestionIndex.value].answer

  if (choice === correctAnswer) {
    // ถ้าตอบถูกไปข้อถัดไป
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
    } else {
      router.push({ name: 'game3' })
    }
  } else {
    if (currentQuestionIndex.value == 2){
      currentWrongIndex.value = 3
    }
    else if(currentQuestionIndex.value == 5){
      currentWrongIndex.value = 4
    }
    else if(currentQuestionIndex.value == 6){
      currentWrongIndex.value = 5
    }
    showQuestion.value = false
  }
}

const checkWrong = (choice) => {
  const correctAnswer = wrong.value[currentWrongIndex.value].answer

  if (choice === correctAnswer) {
    if(currentWrongIndex.value == 3){
      currentWrongIndex.value = currentWrongIndex.value + 4
    }
    else if(currentWrongIndex.value == 4){
      currentWrongIndex.value = currentWrongIndex.value + 3
    }
    else if(currentWrongIndex.value == 5){
      currentWrongIndex.value = currentWrongIndex.value + 2
    }
    else if (currentWrongIndex.value < wrong.value.length - 1) {
      currentWrongIndex.value++
    } 
    else {
      showQuestion.value = true
      currentWrongIndex.value = 6
    }
  } else {
    // ถ้าตอบผิด ซ่อนคำถาม
    showQuestion.value = true
  }
}

// รีเซ็ตให้คำถามกลับมา
const resetQuestion = () => {
  showQuestion.value = true
}
</script>


<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>