<template>
    <div class="header">
        <!-- TODAY BUTTON -->
        <div class="todayButtonDiv">
            <span class="todayButton clickableElement" :title=dayCurrent>{{t.today}}</span>
        </div>
        <!-- BUTTONS TO SKIP <  > -->
        <div class="previousAndNextButtonDiv">
            <span class="previousAndNextButton clickableElement"  :title=previousCurrent>
                <font-awesome-icon icon="fa-solid fa-angle-left" />
            </span>
            <span class="previousAndNextButton clickableElement" :title=nextCurrent>
                <font-awesome-icon icon="fa-solid fa-angle-right" />
            </span>
        </div>
        <!-- CURRENT MONTH -->
        <div class="currentMonth"> {{ monthCurrent }}</div>
        <!-- PERCENTAGE REGISTERED TODAY -->
        <div class="percentageRegisteredToday"> {{ numberOfCategoriesAlreadyAnswered }}</div>
        <!-- SELECT FROM CALENDAR TYPES -->
        <div id="selectFromCalendarTypesClickable">
            <div class="selectFromCalendarTypes clickableElement" @click="showDropdown()">
                <span>{{ currentlySelected }}</span>
                <span>
                    <font-awesome-icon icon="fa-solid fa-angle-down" id="dropdownDownUpperIcon" />
                </span>
            </div>
            <div id="dropdownSelect" v-if="isDropdownVisible">
                <span class="optionsDropdownOption" @click="mudarVisualizacao('T')">
                    <span>
                        {{ t.today }}
                    </span>
                    <span>
                        {{ t.shortcutToday }}
                    </span>
                </span>
                <span class="optionsDropdownOption" @click="mudarVisualizacao('W')">
                    <span>
                        {{ t.week }}
                    </span>
                    <span>
                        {{ t.shortcutWeek }}
                    </span>
                </span>
                <span class="optionsDropdownOption" @click="mudarVisualizacao('M')">
                    <span>
                        {{ t.month }}
                    </span>
                    <span>
                        {{ t.shortcutMonth }}
                    </span>
                </span>
                <span class="optionsDropdownOption" @click="mudarVisualizacao('Y')">
                    <span>
                        {{ t.year }}
                    </span>
                    <span>
                        {{ t.shortcutYear }}
                    </span>
                </span>
            </div>
        </div>
        <!-- PROJECT NAME -->
        <div class="projectName">DailyFy</div>
    </div>
</template>

<script>
    import { translations } from '@/locales/translate.js'
    import { activeLang, defaultCalendarSet, setDefaultCalendarSet, subscribeToDefaultCalendarSet, numberOfCategoriesAlreadyAnswered } from '@/config/config.js'
    import { backgroundColor, fontColor, secondaryColor, tertiaryColor } from '@/config/styles.js';

    export default {
        data(){
            return {
                lang: activeLang,
                defaultCalendarSet: defaultCalendarSet,
                backgroundColor: backgroundColor,
                tertiaryColor: tertiaryColor,
                fontColor: fontColor,
                secondaryColor: secondaryColor,
                isDropdownVisible: false,
                unsubscribeFromDefaultCalendarSet: null,
                numOfCategoriesAlreadyAnswered: numberOfCategoriesAlreadyAnswered,
            }
        },        
        computed: {
            t() {
                return translations[this.lang]
            },
            monthCurrent() {
                const calendar = this.defaultCalendarSet;

                if (calendar === 'T') {
                    return this.monthCurrentToday();
                }
                if (calendar === 'W') {
                    return this.monthCurrentWeek();
                }
                if (calendar === 'M') {
                    return this.monthCurrentMonth();
                }
                if (calendar === 'Y') {
                    return this.monthCurrentYear();
                }
                return '';
            },
            currentlySelected() {
                const calendar = this.defaultCalendarSet;

                if (calendar === 'T') {
                    return this.t.today;
                }
                if (calendar === 'W') {
                    return this.t.week;
                }
                if (calendar === 'M') {
                    return this.t.month;
                }
                if (calendar === 'Y') {
                    return this.t.year;
                }
                return '';
            },
            dayCurrent(){
                const today = new Date();
                return `${this.t.daysOfTheWeekFullName[today.getDay()]}, ${today.getDate()} - ${this.t.monthsOfTheYear[today.getMonth()]}`;
            },
            previousCurrent(){
                const calendar = this.defaultCalendarSet;
                if (calendar === 'T') {
                    if(this.lang == 'pt'){
                        return `Dia anterior`;
                    } else {
                        return `Previus day`;
                    }
                }
                if (calendar === 'W') {
                    if(this.lang == 'pt'){
                        return `Semana anterior`;
                    } else {
                        return `Previous week`;
                    }
                }
                if (calendar === 'M') {
                    if(this.lang == 'pt'){
                        return `Mês anterior`;
                    } else {
                        return `Previous month`;
                    }
                }
                if (calendar === 'Y') {
                    if(this.lang == 'pt'){
                        return `Ano anterior`;
                    } else {
                        return `Previous year`;
                    }
                }
                return '';
            },
            nextCurrent(){
                const calendar = this.defaultCalendarSet;
                if (calendar === 'T') {
                    if(this.lang == 'pt'){
                        return `Próximo dia`;
                    } else {
                        return `Next day`;
                    }
                }
                if (calendar === 'W') {
                    if(this.lang == 'pt'){
                        return `Próxima semana`;
                    } else {
                        return `Next week`;
                    }
                }
                if (calendar === 'M') {
                    if(this.lang == 'pt'){
                        return `Próximo mês`;
                    } else {
                        return `Next month`;
                    }
                }
                if (calendar === 'Y') {
                    if(this.lang == 'pt'){
                        return `Próximo ano`;
                    } else {
                        return `Next year`;
                    }
                }
                return '';

            },
            numberOfCategoriesAlreadyAnswered(){
                return `${this.numOfCategoriesAlreadyAnswered}%`;
            }
        },
        mounted() {
            window.addEventListener('keydown', this.capturarAtalho);
            this.unsubscribeFromDefaultCalendarSet = subscribeToDefaultCalendarSet((calendarSet) => {
                this.defaultCalendarSet = calendarSet;
            });
        },
        beforeUnmount() {
            window.removeEventListener('keydown', this.capturarAtalho);
            if (this.unsubscribeFromDefaultCalendarSet) {
                this.unsubscribeFromDefaultCalendarSet();
            }
        },
        methods: {

            monthCurrentToday(){
                const today = new Date();
                return `${today.getDate()} - ${this.t.monthsOfTheYear[today.getMonth()]} - ${today.getFullYear()}`;
            },
            monthCurrentWeek(){
                const today = new Date();
                return `${this.t.monthsOfTheYear[today.getMonth()]} - ${today.getFullYear()}`;
        
            },
            monthCurrentMonth(){
                const today = new Date();
                return `${this.t.monthsOfTheYear[today.getMonth()]} - ${today.getFullYear()}`;
            },
            monthCurrentYear(){
                const today = new Date();
                return today.getFullYear();
            },
            showDropdown(){
                if(this.isDropdownVisible){
                    // dropdownDownUpperIcon
                    this.isDropdownVisible = false;
                } else {
                    this.isDropdownVisible = true;
                }
            },
            mudarVisualizacao(tipo) {
                setDefaultCalendarSet(tipo);
                this.isDropdownVisible = false;
            },
            capturarAtalho(event) {
                if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;

                const teclaPressionada = event.key.toLowerCase();
                
                if (teclaPressionada === this.t.shortcutToday.toLowerCase()) {
                    this.mudarVisualizacao('T');
                } 
                else if (teclaPressionada === this.t.shortcutWeek.toLowerCase()) {
                    this.mudarVisualizacao('W');
                } 
                else if (teclaPressionada === this.t.shortcutMonth.toLowerCase()) {
                    this.mudarVisualizacao('M');
                } 
                else if (teclaPressionada === this.t.shortcutYear.toLowerCase()) {
                    this.mudarVisualizacao('Y');
                }
            }
        }
    }

</script>

<style>
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0px 5%;
        margin-bottom: 15px;
    }

    .projectName{
        color: v-bind(fontColor)
    }

    .todayButton{
        color: v-bind(fontColor);
        border-radius: 30px;
        border: 1px, solid #fff;
        padding: 5px 15px;
        cursor: pointer
    }

    .previousAndNextButtonDiv{
        color: v-bind(fontColor);
        display: flex;
        gap: 10px;
        font-weight: 700;
    }

    .previousAndNextButton{
        padding: 5px 5px;
        border-radius: 50%;
        border: 1px solid #fff;
        cursor: pointer;
    }

    .clickableElement:hover{
        background-color: #2a2a2b; 
    }

    .styleSelect{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .currentMonth{
        color: v-bind(fontColor);
        font-weight: 500;
        font-size: 20px;
    }

    .selectFromCalendarTypes{
        display: flex;
        border-radius: 30px;
        border: 1px, solid #fff;
        padding: 5px 15px;
        color: v-bind(fontColor);
        gap: 30px;
        cursor: pointer
    }

    #selectFromCalendarTypesClickable {
        position: relative; 
    }

    #dropdownSelect {
        position: absolute;
        top: 100%;
        left: -70%;
        width: 170%;
        margin-top: 5px;
        border-radius: 10px;
        color: v-bind(fontColor);
        background-color: v-bind(backgroundColor);
        display: flex;
        flex-direction: column;
        padding: 15px 0px;
        z-index: 100;
        box-sizing: border-box;
    }

    .optionsDropdownOption {
        width: 100%;
        padding: 12px 15px;
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
    }

    .optionsDropdownOption:hover {
        background-color: #2a2a2b; 
    }

    .percentageRegisteredToday{
        color: v-bind(fontColor);
        background-color: v-bind(secondaryColor);
        padding: 8px 5px;
        border-radius: 50%;
        cursor: pointer;
    }

    .percentageRegisteredToday:hover{
        opacity: 0.9;
    }

</style>