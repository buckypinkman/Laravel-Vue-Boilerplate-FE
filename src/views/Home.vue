<template>
    <div class="row">
        <div class="col-3">
                <span>Select Period</span>
                <n-date-picker v-model:value="timestamp" @change="getDatas" type="year" />
        </div>
        <div class="col-9 d-flex align-items-center">
                <marquee behavior="" direction="left"><h4>{{ datas.app_settings?.home_marquee_text }}</h4></marquee>
        </div>
    </div>
    <n-spin :show="showSpin">
        <div class="row mt-2 g-2">
            <card-widget :count="datas.jumlah_hewan_qurban_sapi" body="Jumlah Hewan Qurban">
                🐂
            </card-widget>
            <card-widget :count="datas.jumlah_hewan_qurban_kambing" body="Jumlah Hewan Qurban">
                🐐
            </card-widget>
            <card-widget 
                :count="datas.jumlah_realisasi_mustahiq_out" 
                :second_count="datas.jumlah_realisasi_mustahiq_in" 
                :additional_info="datas.jumlah_realisasi_mustahiq_in - datas.jumlah_realisasi_mustahiq_in"
                body="Jumlah Realisasi Bungkus - Mustahiq (keluar/masuk)"
            >
                <n-icon>
                    <CubeOutline />
                </n-icon>
            </card-widget>
            <card-widget 
                :count="datas.jumlah_realisasi_pequrban_out" 
                :second_count="datas.jumlah_realisasi_pequrban_in" 
                :additional_info="datas.jumlah_realisasi_pequrban_in - datas.jumlah_realisasi_pequrban_out"
                body="Jumlah Realisasi Bungkus - Pequrban (keluar/masuk)"
            >
                <n-icon>
                    <PersonCircleOutline />
                </n-icon>
            </card-widget>
        </div>
        <div class="row mt-1 g-2">
            <div class="col-lg-3">
                <n-card title="Penyembelih Sapi (ekor)" class="shadow">
                    <Doughnut :chart-data="chartDataSapi" height="30%"/>
                </n-card>
                <n-card title="Penyembelih Kambing (ekor)" class="mt-2 shadow">
                    <Doughnut :chart-data="chartDataKambing" height="30%"/>
                </n-card>
            </div>
            <div class="col-lg-5">
                <n-card title="Progress penyembelihan - Distribusi" style="height: 60vh; overflow: auto" class="shadow">
                    <n-empty v-if="datas.monitoring.length == 0" description="Data kosong" />
                    <!-- <div class="wrapper container">
                        <div class="marquee"> -->
                            <Vue3Marquee pause-on-hover vertical duration="700" gradientLength="10px" delay="1" style="width: 100%">
                                <div v-for="(item, idx) in datas.monitoring" :key="idx" style="width: 100%">
                                    <h3 class="mb-2 pt-0">{{item.name}}</h3>
                                    <n-steps :current="getCurrentStep(item.monitoring ?? {})" status="process">
                                        <n-step
                                            title="SB"
                                            description=""
                                        />
                                        <n-step
                                            title="KU"
                                            description=""
                                        />
                                        <n-step
                                            title="BL"
                                            description=""
                                        />
                                        <n-step
                                            title="CI"
                                            description=""
                                        />
                                        <n-step
                                            title="DI"
                                            description=""
                                        />
                                    </n-steps>
                                </div>
                            </Vue3Marquee>
                        <!-- </div>
                    </div> -->
                </n-card>
            </div>
            <div class="col-lg-4">
                <n-card title="Nama Peng-Qurban" class="shadow" style="overflow: auto">
                    <template #header-extra>
                        <div class="div">
                            <div class="d-flex align-items-center">
                                <n-icon color="green" size="23">
                                    <CheckmarkDone />
                                </n-icon>
                                <span>Diterima</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <n-icon size="21">
                                    <HourglassOutline />
                                </n-icon>
                                <span>Pengiriman</span>
                            </div>
                        </div>
                    </template>
                    <div class="d-flex" style="gap: 20px; width: 100%">
                        <n-empty v-if="datas.nama_pequrban.length == 0" description="Data kosong" />
                        <Vue3Marquee pause-on-hover duration="1000" delay="1" style="width: 100%">
                            <template v-for="(item, idx) in datas.nama_pequrban" :key="idx">
                                <div style="width: 150px">
                                    <h4 style="width: 100%">{{ item.name }}</h4>

                                    <span v-for="(list2, idx2) in item.pequrban" class="d-flex align-items-center" :key="idx2">
                                        <span class="me-2">{{idx+1}}. {{list2.qurban_untuk}} - {{list2.alamat}}</span> 
                                        <template v-if="list2.distribusi">
                                            <n-icon v-if="list2.distribusi.status == 'diterima'" color="green"><CheckmarkDone /></n-icon>
                                            <n-icon v-else-if="list2.distribusi.status == 'pengiriman'" color="black"><HourglassOutline /></n-icon> 
                                            <n-icon v-else color="red"><CloseCircleOutline /></n-icon> <br>
                                        </template>
                                        <n-icon v-else color="red"><CloseCircleOutline /></n-icon> <br>
                                    </span>
                                        
                                </div>
                            </template>
                        </Vue3Marquee>
                    </div>
                </n-card>
                <n-card style="max-height: 100%" class="mt-2 shadow">
                    <iframe :src="datas.app_settings?.home_iframe_url" style="width: 100%; min-height: 400px" frameborder="0"></iframe>
                </n-card>
            </div>
        </div>
    </n-spin>
</template>
<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { Doughnut } from 'vue-chartjs'
import CardWidget from '@/components/CardWidget.vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { CubeOutline, PersonCircleOutline, CheckmarkDone, HourglassOutline, CloseCircleOutline } from "@vicons/ionicons5";
import moment from 'moment'
import { NDatePicker, NSteps, NStep, NSpin, NEmpty } from 'naive-ui/lib';
import axios from 'axios';
import _ from '@/utils/general'
// import Vue3Marquee from 'vue3-marquee'

const timestamp = defineModel({default: (new Date())})

ChartJS.register(ArcElement, Tooltip, Legend)

const steps = [1, 2, 4, 3, 3, 2, 1];
const datas = ref({monitoring: [], nama_pequrban: []})
const showSpin = ref(false)
const chartDataKambing = ref({
  labels: [
    'Hidup',
    'Sembelih',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50],
    backgroundColor: [
    'rgb(54, 162, 235)',
      'rgb(255, 99, 132)',
    ],
    hoverOffset: 4
  }]

});

const chartDataSapi = ref({
  labels: [
    'Hidup',
    'Sembelih',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50],
    backgroundColor: [
    'rgb(54, 162, 235)',
      'rgb(255, 99, 132)',
    ],
    hoverOffset: 4
  }]

});

const getDatas = async () => {
    showSpin.value = true
    const res = await axios.get(`/home?year=${new Date(timestamp.value).getFullYear()}`)

    datas.value = res.data.data
    chartDataKambing.value.datasets[0].data = res.data.data.penyembelihan_kambing
    chartDataSapi.value.datasets[0].data = res.data.data.penyembelihan_sapi
    showSpin.value = false
}

const getCurrentStep = (val = {}) => {
    if(val) {
        if(val.step_5 == 'sudah') return 5
        if(val.step_4 == 'sudah') return 4
        if(val.step_3 == 'sudah') return 3
        if(val.step_2 == 'sudah') return 2
        if(val.step_1 == 'sudah') return 1
    }

    return 0

}

onMounted(() => {
    getDatas()
    setInterval(() => {
        getDatas()
    }, 5000);
})
</script>

<style scoped>
.container {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
}

.marquee {
    top: 6em;
    position: relative;
    box-sizing: border-box;
    animation: marquee 15s linear infinite;
}

.marquee:hover {
    animation-play-state: paused;
}

/* Make it move! */
@keyframes marquee {
    0%   { top:   8em }
    100% { top: -11em }
}

/* Make it look pretty */
.wrapper .marquee {
	margin: 0;
    padding: 0 1em;
    line-height: 1.5em;
    font: 1em 'Segoe UI', Tahoma, Helvetica, Sans-Serif;
}

.wrapper:before, .wrapper::before,
.wrapper:after,  .wrapper::after {
    left: 0;
    z-index: 1;
    content: '';
    position: absolute;
    pointer-events: none;
    width: 100%; height: 2em;
    background-image: linear-gradient(top, #FFF, rgba(255,255,255,0));
}

.wrapper:after, .wrapper::after {
    bottom: 0;
    transform: rotate(180deg);
}

.wrapper:before, .wrapper::before {
    top: 0;
}

/* Style the links */
.vanity {
    color: #333;
    text-align: center;
    font: .75em 'Segoe UI', Tahoma, Helvetica, Sans-Serif;
}

.vanity a, .wrapper a {
    color: #1570A6;
    transition: color .5s;
    text-decoration: none;
}

.vanity a:hover, .wrapper a:hover {
    color: #F65314;
}

/* Style toggle button */
.toggle {
	display: block;
    margin: 2em auto;
}
</style>
