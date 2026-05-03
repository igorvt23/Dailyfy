<template>
    <div class="header">
        <!-- TODAY BUTTON -->
        <div class="todayButtonDiv">
            <span class="todayButton clickableElement">{{t.today}}</span>
        </div>
        <!-- BUTTONS TO SKIP <  > -->
        <div class="previousAndNextButtonDiv">
            <span class="previousAndNextButton clickableElement">
                <font-awesome-icon icon="fa-solid fa-angle-left" />
            </span>
            <span class="previousAndNextButton clickableElement">
                <font-awesome-icon icon="fa-solid fa-angle-right" />
            </span>
        </div>
        <!-- CURRENT MONTH -->
        <div class="currentMonth"> {{ monthCurrent }}</div>
        <!-- PERCENTAGE REGISTERED TODAY -->
        <div class="percentageRegisteredToday"></div>
        <!-- SELECT FROM CALENDAR TYPES -->
        <div id="selectFromCalendarTypesClickable">
            <div class="selectFromCalendarTypes clickableElement" @click="showDropdown()">
                <span>{{ currentlySelected }}</span>
                <span>
                    <font-awesome-icon icon="fa-solid fa-angle-down" id="dropdownDownUpperIcon" />
                </span>
            </div>
            <div id="dropdownSelect" v-if="isDropdownVisible">
                <span class="optionsDropdownOption">
                    <span>
                        {{ t.today }}
                    </span>
                    <span>
                        {{ t.shortcutToday }}
                    </span>
                </span>
                <span class="optionsDropdownOption">
                    <span>
                        {{ t.week }}
                    </span>
                    <span>
                        {{ t.shortcutWeek }}
                    </span>
                </span>
                <span class="optionsDropdownOption">
                    <span>
                        {{ t.month }}
                    </span>
                    <span>
                        {{ t.shortcutMonth }}
                    </span>
                </span>
                <span class="optionsDropdownOption">
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
    import { activeLang, defaultCalendarSet } from '@/config/config.js'
    import { backgroundColor, fontColor, tertiaryColor } from '@/config/styles.js';

    export default {
        data(){
            return {
                lang: activeLang,
                defaultCalendarSet: defaultCalendarSet,
                backgroundColor: backgroundColor,
                tertiaryColor: tertiaryColor,
                fontColor: fontColor,
                isDropdownVisible: false,
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
        color: #fff;
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

</style>