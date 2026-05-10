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

        <div class="grid" v-if="showCalendarMonthOrWeek || showCalendarToday">
            <div class="cell" v-for="(day, index) in days" :key="index" 
                 :style="{color: day.color, backgroundColor: day.backgroundColor}" 
                 :class="{'isToday' : day.currentday}" 
                 @click="addQuestionOrChecklist(day.number, day.month)">
                {{ day.number }}
            </div>
        </div>

        <div class="gridYear" v-if="showCalendarYear">
            <div class="cellMonthsYear" v-for="(month, index) in days" :key="index">

                <h2 class="monthsOfTheYear">{{ t.monthsOfTheYear[index] }}</h2>

                <div class="gridHeaderYear">
                    <div class="cellDaysOfTheWeekYear" v-for="day in t.dayOfTheWeek" :key="day">
                        {{ day.charAt(0) }}
                    </div>
                </div>
                <div class="monthGrid">
                    <div class="yearCell" v-for="(day, index2) in month" :key="index2" 
                         :style="{color: day.color, backgroundColor: day.backgroundColor}" 
                         :class="{'isToday' : day.currentday}" 
                         @click="addQuestionOrChecklist(day.number, day.month)">
                    {{ day.number }}
                    </div>
                </div>
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
                return translations[this.lang] || { dayOfTheWeek: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'], monthsOfTheYear: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'], daysOfTheWeekFullName: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'] };
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
                this.defCalendarSet = calendarSet; 
                this.days = createACalendar(calendarSet);
                this.showCalendarMonthOrWeek = calendarSet === 'W' || calendarSet === 'M';
                this.showCalendarToday = calendarSet === 'T';
                this.showCalendarYear = calendarSet === 'Y';
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
        if (calendar === 'T') return createToday();
        if (calendar === 'W') return createWeek();
        if (calendar === 'M') return createMonth();
        if (calendar === 'Y') return createYear();
        return [];
    }

    function createToday(){
        const today = new Date();    
        const color = '#ffffff';
        const backgroundColor = '#131314';
        
        return [{
            month: today.getMonth(),
            number: today.getDate(),
            color: color,
            backgroundColor: backgroundColor,
            currentday: true,
        }];
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
            const isToday = today.getDate() === day.getDate() && today.getMonth() === day.getMonth() && today.getFullYear() === day.getFullYear();
            
            const color = '#ffffff'; 
            const backgroundColor = '#131314'; 
    
            days.push({
                month: day.getMonth(),
                number: day.getDate(),
                color: color,
                backgroundColor: backgroundColor,
                currentday: isToday,
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
        for (let i = 0; i < 42; i++){
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            
            const currentMonth = day.getMonth() === today.getMonth();
            const isToday = today.getDate() === day.getDate() && today.getMonth() === day.getMonth() && today.getFullYear() === day.getFullYear() && currentMonth;
            const color = (!currentMonth) ? '#c6c6c6' : '#ffffff';
            const backgroundColor = (!currentMonth) ? '#37373a' : '#131314';
    
            days.push({
                month: day.getMonth(),
                number: day.getDate(),
                color: color,
                backgroundColor: backgroundColor,
                currentday: isToday,
            })
        }
        return days;
    }

    function createYear(){
        const today = new Date();
        const currentYear = today.getFullYear();

        function createSpecificMonth(monthIndex, year){
            const firstDay = new Date(year, monthIndex, 1);        
            const start = new Date(firstDay);
            start.setDate(firstDay.getDate() - firstDay.getDay());
        
            const monthWithDays = [];
            for (let i = 0; i < 42; i++){
                const day = new Date(start);
                day.setDate(start.getDate() + i);
                
                const isCurrentMonth = day.getMonth() === monthIndex;
                const isToday = today.getDate() === day.getDate() && today.getMonth() === day.getMonth() && today.getFullYear() === day.getFullYear() && isCurrentMonth;
                
                const color = (!isCurrentMonth) ? '#c6c6c6' : '#ffffff';
                const backgroundColor = (!isCurrentMonth) ? '#37373a' : '#131314';
        
                monthWithDays.push({
                    month: day.getMonth(),
                    number: day.getDate(),
                    color: color,
                    backgroundColor: backgroundColor,
                    currentday: isToday,
                });
            }
            return monthWithDays;
        }
    
        const months = [];
        for (let j = 0; j < 12; j++){
            months.push( createSpecificMonth(j, currentYear) )
        }
        return months;
    }
</script>

<style>
    .calendar {
        background-color: v-bind(backgroundColor);
        width: 90vw;
        min-width: 150px;
        min-height: 90dvh;
        height: 90svh;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    
    .isToday {
        background-color: v-bind(secondaryColor) !important;
        font-weight: bold;
    }
    
    .cell {
        padding: 5px;
        border: 1px solid #c6c6c6;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        height: 100%;
        box-sizing: border-box;
    }
    
    .cell:hover {
        opacity: 0.8;
    }

    .yearCell {
        border: 1px solid #c6c6c6;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        min-height: 25px;
        height: 100%;
        box-sizing: border-box;
    }
    
    .yearCell:hover {
        opacity: 0.8;
    }
    
    .grid {
        background-color: v-bind(invertedBackgroundColor);
        display: grid;
        grid-template-columns: v-bind(gridColumns);
        flex: 1;
        grid-auto-rows: 1fr;
        height: 100%;
    }
    
    .gridYear { 
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 15px;
        padding: 15px 5px;
        align-items: start;
        justify-items: center;
        overflow-y: auto;
        height: 100%;
    }

    @media (min-width: 650px) {
        .gridYear {
            grid-template-columns: repeat(2, 1fr);
        }
    }   
    @media (min-width: 950px) {
        .gridYear {
            grid-template-columns: repeat(3, 1fr);
        }
    }   
    @media (min-width: 1250px) {
        .gridYear {
            grid-template-columns: repeat(4, 1fr);
        }
    }
    
    .cellMonthsYear { 
        padding: 0;
        background-color: v-bind(invertedBackgroundColor);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 220px;
        max-width: 360px;
        overflow: hidden;
        border: 1px solid #c6c6c6;
    }

    .monthGrid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        flex: 1;
        grid-auto-rows: 1fr;
        height: 100%;
    }
    
    .gridHeader {
        display: grid;
        grid-template-columns: v-bind(gridColumns);
        min-height: 25px;
        max-height: 35px;
    }

    .gridHeaderYear {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background-color: v-bind(tertiaryColor);
        min-height: 25px;
    }
    
    .cellDaysOfTheWeek {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        font-size: 12px;
        font-weight: bold;
        background-color: v-bind(tertiaryColor);
        color: v-bind(fontColor);
        border: 1px solid #c6c6c6;
    }

    .cellDaysOfTheWeekYear {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        font-size: 12px;
        font-weight: bold;
        color: v-bind(fontColor);
        border: 1px solid #c6c6c6;
    }
    
    .monthsOfTheYear {
        color: v-bind(fontColor);
        background-color: v-bind(tertiaryColor);
        text-align: center;
        margin: 0;
        padding: 8px 0;
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>