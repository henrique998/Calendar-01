import './styles/global.scss'
import './styles/home.scss'

import { months } from './utils/calendar-months'
import { isSameDay } from './utils/isSameDay'

const monthName = document.getElementById('month-name')
const previousMonthButton = document.getElementById('previous-month-button')
const nextMonthButton = document.getElementById('next-month-button')
const daysContainer = document.querySelector('.days-container')

const now = new Date() 

const renderCalendar = () => {
    let currenMonthIndex = now.getMonth()

    const lastDayOfCurrentMonth = new Date(now.getFullYear(), currenMonthIndex + 1, 0)
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), currenMonthIndex, 1).getDay()
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), currenMonthIndex, 0).getDate()
    
    const nextDays = 7 - lastDayOfCurrentMonth.getDay() - 1
    
    let daysOfPreviousMonth: number[] = []
    let daysOfCurrentMonth: number[] = []
    let daysOfNextMonth: number[] = []
    
    monthName!.innerText = months[currenMonthIndex]
    
    function generateDaysOfPreviousMonth() {
        for (let i = firstDayOfCurrentMonth; i > 0; i--) {
            daysOfPreviousMonth.push(i)
        }
    }
    
    function showDaysOfPreviousMonth() {
        for (let day of daysOfPreviousMonth) {
            daysContainer!.innerHTML += `<li class="day other-month">${lastDayOfPreviousMonth - day + 1}</li>`
        }
    }
    
    function generateDaysOfCurrentMonth() {
        for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
            daysOfCurrentMonth.push(i)
        }
    }
    
    function showDaysOfCurrentMonth() {
        for (let day of daysOfCurrentMonth) {
            const liStyle = isSameDay(day, now, 'selected')
    
            daysContainer!.innerHTML += `<li class="day ${liStyle}">${day}</li>`
        }
    }
    
    function generateDaysOfNextMonth() {
        for (let i = 1; i <= nextDays; i++) {
            daysOfNextMonth.push(i)
        }
    }
    
    function showDaysOfNextMonth() {        
        for (let day of daysOfNextMonth) {
            daysContainer!.innerHTML += `<li class="day other-month">${day}</li>`
        }
    }
    
    generateDaysOfPreviousMonth()
    showDaysOfPreviousMonth()
    
    generateDaysOfCurrentMonth()
    showDaysOfCurrentMonth()
    
    generateDaysOfNextMonth()
    showDaysOfNextMonth()
}

function handleGoToPreviousMonth() {
    daysContainer!.innerHTML = ''

    now.setMonth(now.getMonth() - 1)

    renderCalendar()
}

function handleGoToNextMonth() {
    daysContainer!.innerHTML = ''
    
    now.setMonth(now.getMonth() + 1)

    renderCalendar()
}

previousMonthButton!.addEventListener('click', handleGoToPreviousMonth)
nextMonthButton!.addEventListener('click', handleGoToNextMonth)

renderCalendar()