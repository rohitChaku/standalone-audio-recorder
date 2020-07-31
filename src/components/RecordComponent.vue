<template>
  <div class="container">
    <ul class="flex-container space-around">
      <li>
        <div class="row">
          <div class="row title">
            <strong>
              Please record the following text, part 
              <em> {{ curIndex+1 }} </em> 
              of 
              <em> {{ totalRecords }} </em>
              .
            </strong>
          </div>
          <textarea 
            class="row text" 
            v-model="fullText[curIndex].text" 
            disabled>
          </textarea>
        </div>
        <br>
        <div class="row">
          <audio-player 
            v-if="audioDone[curIndex]" 
            :src="`/src/data/${fullText[curIndex].id}.wav`"/>
          <div v-else>
            No recorded Audio for this text.
            <br> <br> <br>
          </div>
        </div>
        <br>
        <div class="row flex-container space-between bottom-shift">
          <li>
            <button class="button button-default" @click="curIndex -= 1" v-if="curIndex > 0">
              Prev
            </button>
          </li>
          <li>
            <button class="button button-default" @click="curIndex += 1" v-if="curIndex+1 < totalRecords">
              Next
            </button>
          </li>
        </div>
      </li>
      <li>
        <audio-recorder
          :filename="fullText[curIndex].id"
          format="wav"
          :headers="headers"
          :before-recording="callback"
          :pause-recording="callback"
          :after-recording="afterRecording"
          :select-record="callback"
          :before-upload="callback"
          :successful-upload="callback"
          :failed-upload="callback"
          :bit-rate="192"/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import { AudioPlayer, AudioRecorder } from 'vue-audio-recorder';

export default {
	name: 'RecordComponent',
	components: {
    AudioPlayer,
    AudioRecorder
  },
  data () {
    return {
      fullText: '',
      totalRecords: 0,
      curIndex: 0,
      audioDone: [],
      headers: {
        'X-Custom-Header': 'Web Recorder for Voicezen India Pvt. Ltd.'
      }
    }
  },
  mounted () {
    axios
      .get('http://localhost:5000/records')
      .then(response => (
        this.fullText = response.data,
        this.totalRecords = response.data.length,
        this.audioDone = Array(response.data.length).fill(false)
      ))
  },
  methods: {
    callback (msg) {
      console.log('Event: ', msg);
    },
    afterRecording (msg) {
      var self = this;
      // Vue.set(this.audioDone, this.curIndex, true);
      var reader = new FileReader();
      reader.readAsDataURL(msg.blob);
      reader.onloadend = function() {
        var base64data = reader.result;
        axios
        .post('http://localhost:5000/saveRecord', {
          base64data,
          filepath: `./data/${self.fullText[self.curIndex].id}.wav`
        })
        .then(
			response => {
				Vue.set(self.audioDone, self.curIndex, true);
				console.log(response);
			},
			error => {
				console.log(error);
			}
        );
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 8%;
}

.space-around {
  justify-content: space-around;
}
.space-evenly {
  justify-content: space-evenly;
}
.space-between {
  justify-content: space-between;
}

.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}

.title {
  margin-top: 6%;
  font-size: 140%;
}
.text {
  margin-top: 5%;
  font-size: 115%;
}

.button-default {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
.button {
  background-color: white;
  color: black;
  border: 2px solid #008cba;
}
.button:hover {
  background-color: #008cba;
  color: white;
}

.bottom-shift {
  bottom: -7%;
  position: relative;
}

textarea {
  width: 600px;
  height: 80px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
</style>
