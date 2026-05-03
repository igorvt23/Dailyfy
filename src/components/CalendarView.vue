<template>
    <div class="calendar">
        <div class="gridHeader" v-if="showCalendarMonthOrWeek">
            <div class="cellDaysOfTheWeek" v-for="day in t.dayOfTheWeek" :key="day">
                {{ day }}
            </div>
        </div>
        <div class="gridHeader" v-if="showCalendarToday">
            <div class="cellDaysOfTheWeek">
                {{ dayCurrent }}
            </div>
        </div>
        <div class="grid" v-if="!showCalendarYear">
            <div class="cell" v-for="(day, index) in days" :key="index" :style="{color: day.color, backgroundColor: day.backgroundColor}" :class="{'isToday' : day.currentday}" @click="addQuestionOrChecklist(day.number, day.month)">
                {{ day.number }}
            </div>
        </div>
        <div class="grid" v-if="showCalendarYear">
            <div class="cell" v-for="(month, index) in months" :key="index">
                {{ month }}
            </div>
        </div>
    </div>
</template>
<script>
    import { translations } from '@/locales/translate.js'
    import { activeLang, defaultCalendarSet, subscribeToDefaultCalendarSet } from '@/config/config.js'
    import { backgroundColor, fontColor, secondaryColor, tertiaryColor, invertedBackgroundColor } from '@/config/styles.js';

    export default {
        name: 'CalendarView',
        data(){
            return {
                days: createACalendar(defaultCalendarSet),
                lang: activeLang,
                defCalendarSet: defaultCalendarSet,
                backgroundColor: backgroundColor,
                fontColor: fontColor,
                secondaryColor: secondaryColor,
                tertiaryColor: tertiaryColor,
                invertedBackgroundColor: invertedBackgroundColor,
                showCalendarYear: defaultCalendarSet === 'Y',
                showCalendarToday: defaultCalendarSet === 'T',
                showCalendarMonthOrWeek: defaultCalendarSet === 'W' || defaultCalendarSet === 'M',
                unsubscribeFromDefaultCalendarSet: null,
            }
        },
        computed: {
            t() {
                return translations[this.lang]
            },
            dayCurrent(){
                const today = new Date();
                return `${this.t.daysOfTheWeekFullName[today.getDay()]}`;
            },
            gridColumns() {
                return this.defCalendarSet === 'T' ? '1fr' : 'repeat(7, 1fr)';
            }
        },
        mounted() {
            this.unsubscribeFromDefaultCalendarSet = subscribeToDefaultCalendarSet((calendarSet) => {
                // Corrige o nome da variável para bater com o que está no data()
                this.defCalendarSet = calendarSet; 
                
                // Atualiza os dias
                this.days = createACalendar(calendarSet);
                
                // Atualiza a exibição de Mês/Semana
                this.showCalendarMonthOrWeek = calendarSet === 'W' || calendarSet === 'M';
                
                // ADICIONE ESTA LINHA: Atualiza a exibição de Hoje
                this.showCalendarToday = calendarSet === 'T'; 
            });
        },
        beforeUnmount() {
            if (this.unsubscribeFromDefaultCalendarSet) {
                this.unsubscribeFromDefaultCalendarSet();
            }
        },
        methods: {
            addQuestionOrChecklist(day, month){
                console.log("day: ", day)
                console.log("month: ", month)
            }
        }
    }

    function createACalendar(calendar){
        if (calendar === 'T') {
            return createToday();
        }
        if (calendar === 'W') {
            return createWeek();
        }
        if (calendar === 'M') {
            return createMonth();
        }
        if (calendar === 'Y') {
            return createYear();
        } 

        return [];
    }

    function createToday(){
        const today = new Date();    
        const day = new Date(today);
        day.setDate(today.getDate()+1);
        const dayNumber = day.getDate();
        const dayNumberEqualToCurrentDay  = today.getDate() == dayNumber;
        const currentMonth = day.getMonth() === today.getMonth();
        const color = (!currentMonth) ? '#c6c6c6' : '#ffffff';
        const backgroundColor = (!currentMonth) ? '#37373a' : '#131314';
        const currentDay = (dayNumberEqualToCurrentDay && currentMonth);
        const days = [];
        days.push ({
            month: day.getMonth(),
            number: dayNumber,
            color: color,
            backgroundColor: backgroundColor,
            currentday: currentDay,
        })
    
        return days;
    }

    function createWeek(){
        const today = new Date();
        const dayOfWeek = today.getDay();       
        const start = new Date(today);
        start.setDate(today.getDate() - dayOfWeek)
    
        const days = [];
        for (let i = 0; i < 7; i++){
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
        // const today = new Date();
        // const firstDay = new Date(today.getFullYear(), 1);        
        // const start = new Date(firstDay);
        // start.setDate(firstDay.getDate() - firstDay.getDay());
    
        // const month = [];
        // for (let i = 0; i < 35; i++){
        //     const day = new Date(start);
        //     day.setDate(start.getDate() + i);
        //     const dayNumber = day.getDate();
        //     const dayNumberEqualToCurrentDay  = today.getDate() == dayNumber;
        //     const currentMonth = day.getMonth() === today.getMonth();
        //     const color = (!currentMonth) ? '#c6c6c6' : '#ffffff';
        //     const backgroundColor = (!currentMonth) ? '#37373a' : '#131314';
        //     const currentDay = (dayNumberEqualToCurrentDay && currentMonth);
    
        //     month.push({
        //         month: day.getMonth(),
        //         number: dayNumber,
        //         color: color,
        //         backgroundColor: backgroundColor,
        //         currentday: currentDay,
        //     })
        // }
    
        // return month;
        return [];
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
        grid-template-columns: v-bind(gridColumns);
        height: 90svh;
    }

    .gridHeader{
        display: grid;
        grid-template-columns: v-bind(gridColumns);
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
