<template>
    <div class="calendar">
        <div class="gridHeader" v-if="showCalendarMonthOrWeek">
            <div class="cellDaysOfTheWeek" v-for="day in t.dayOfTheWeek" :key="day">
                {{ day }}
            </div>
        </div>
        <div class="grid">
            <div class="cell" v-for="(day, index) in days" :key="index" :style="{color: day.color, backgroundColor: day.backgroundColor}" :class="{'isToday' : day.currentday}" @click="addQuestionOrChecklist(day.number, day.month)">
                {{ day.number }}
            </div>
        </div>
    </div>
</template>
<script>
    import { translations } from '@/locales/translate.js'
    import { activeLang, defaultCalendarSet } from '@/config/config.js'
    import { backgroundColor, fontColor, secondaryColor, tertiaryColor, invertedBackgroundColor } from '@/config/styles.js';

    export default {
        name: 'CalendarView',
        data(){
            return {
                days: createACalendar(),
                lang: activeLang,
                defaultCalendarSet: defaultCalendarSet,
                backgroundColor: backgroundColor,
                fontColor: fontColor,
                secondaryColor: secondaryColor,
                tertiaryColor: tertiaryColor,
                invertedBackgroundColor: invertedBackgroundColor,
                showCalendarMonthOrWeek: defaultCalendarSet === 'W' || defaultCalendarSet === 'M',
            }
        },
        computed: {
            t() {
                return translations[this.lang]
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

        const calendar = defaultCalendarSet;
        if(calendar == 'T'){
            return createToday();
        }
        if(calendar == 'W'){
            return createWeek();
        }
        if(calendar == 'M'){
            return createMonth();
        }
        if(calendar == 'Y'){
            return createYear();
        } 
    }

    function createToday(){
    }

    function createWeek(){

    }

    function createMonth(){
        
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
    
        return days;
    }

    function createYear(){
        
    }

</script>
<style>
    .calendar{
        background-color: v-bind(backgroundColor);
        width: 90vw;
        min-width: 150px;
        min-height: 90dvh;
        height: 90svh;
        border-radius: 50%;
    }
    .isToday{
        background-color: v-bind(secondaryColor) !important;
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
        background-color: v-bind(invertedBackgroundColor);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height: 90svh;
    }

    .gridHeader{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height: 10svh;
        max-height: 35px;
        min-height: 20px;
    }

    .cellDaysOfTheWeek{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        font-size: 13px;
        background-color: v-bind(tertiaryColor);
        color: v-bind(fontColor);
        border: 1px solid #c6c6c6;
        max-height: 49px;

    }
</style>