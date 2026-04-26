<template>
    <div class="calendar">
        <div class="grid">
            <div class="cell" v-for="(day, index) in days" :key="index" :style="{color: day.color, backgroundColor: day.backgroundColor}" :class="{'isToday' : day.currentday}" @click="addQuestionOrChecklist(day.number, day.month)">
                {{ day.number }}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CalendarView',
        data(){
            return {
                days: createACalendar()
            }
        },
        methods: {
            addQuestionOrChecklist(day, month){
                console.log("day: ", day)
                console.log("month: ", month)
            }
        }
    }

    function createACalendar(){

        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);        
        const start = new Date(firstDay);
        start.setDate(firstDay.getDate() - firstDay.getDay());
    
        const days = [];
        for (let i = 0; i < 35; i++){
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            const dayNumber = day.getDate();
            const dayNumberEqualToCurrentDay  = today.getDate() == dayNumber;
            const currentMonth = day.getMonth() === today.getMonth();
            const color = (!currentMonth) ? '#c6c6c6' : '#ffffff';
            const backgroundColor = (!currentMonth) ? '#37373a' : '#131314';
            const currentDay = (dayNumberEqualToCurrentDay && currentMonth);
    
            days.push({
                month: day.getMonth(),
                number: dayNumber,
                color: color,
                backgroundColor: backgroundColor,
                currentday: currentDay,
            })
        }
        console.log(days);
    
        return days; 
    }

</script>
<style>
    .calendar{
        background-color: #131314;
        width: 90vw;
        min-width: 150px;
        min-height: 90dvh;
        height: 90svh;
        border-radius: 50%;
    }
    .isToday{
        background-color: #2894f2 !important;
    }
    .cell{
        padding: 5px;
        border: 1px solid #c6c6c6;
        cursor: pointer;
    }
    .cell:hover{
        opacity: 0.9;
    }
    .grid{
        background-color: #ffffff;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height: 90svh;
        border-radius: 50%;

    }
</style>