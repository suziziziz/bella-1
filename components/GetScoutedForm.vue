<template>
  <div class="form">
    <form
      id="getScoutedForm"
      class="w-100"
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="validateForm()"
    >
      <div class="row desc-inputs reset-row">
        <div class="col-lg-6 desc text-center">
          <p class="c-desc">
            {{ $t('getScouted.desc_1') }}<br ><br >
            {{ $t('getScouted.desc_2') }}
          </p>
        </div>

        <div class="col-lg-6 inputs">
          <div
            v-for="input in formInputs"
            :key="input.id"
            :class="
              'wrap-input' + [input.type === 'textarea' ? ' textarea' : '']
            "
          >
            <input
              v-if="input.type === 'text'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
              v-validate="
                input.name === 'Name'
                  ? 'required|alpha_spaces'
                  : input.name === 'Birthday'
                  ? 'required|date_format:dd/MM/yyyy'
                  : 'required'
              "
              :type="input.type"
              :name="'form' + input.name"
              :disabled="sending"
            />

            <input
              v-else-if="input.type === 'email'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
              v-validate="'required|email'"
              :type="input.type"
              :name="'form' + input.name"
              :disabled="sending"
            />

            <textarea
              v-else-if="input.type === 'textarea'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
              v-validate="'required'"
              :name="'form' + input.name"
              :rows="input.rows"
              :disabled="sending"
            />

            <select
              v-else-if="input.type === 'select'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
              v-validate="'required'"
              :name="'form' + input.name"
              :disabled="sending"
            >
              <option
                v-for="option in input.options"
                :key="option.name"
                :value="option.name"
              >
                {{ option.name }}
              </option>
            </select>

            <!-- Finish this latter -->
            <!-- <div v-if="input.type === 'select'" class="options">
              <ul>
                <li v-for="(option, index) in input.options" :key="index">
                  {{ option.name }}
                </li>
              </ul>
            </div> -->

            <label
              :class="[formData[input.name] != '' ? 'not-empty' : '']"
              :for="'form' + input.name"
              >{{ $t('getScouted.form.' + input.name.toString()) }}</label>

            <p
              v-if="errors"
              v-show="errors.has('form' + input.name.toString())"
              class="error-msg"
            >
              {{ errors.first('form' + input.name.toString()) }}
            </p>
          </div>
        </div>
      </div>

      <div class="row selects reset-row">
        <div
          v-for="select in formSelects"
          :key="select.id"
          class="col-md-3 col-sm-6 col-6 select"
        >
          <select
            :id="'form' + select.name"
            v-model="formData[select.name]"
            v-validate="'required'"
            :name="'form' + select.name"
            :disabled="sending"
          >
            <option
              v-for="option in select.options"
              :key="option.name"
              :value="option.name"
            >
              {{ option.name }}
            </option>
          </select>

          <label
            :class="[formData[select.name] != '' ? 'not-empty' : '']"
            :for="'form' + select.name"
            >{{ $t('getScouted.form.' + select.name.toString()) }}</label>

          <p
            v-if="errors"
            v-show="errors.has('form' + select.name.toString())"
            class="error-msg"
          >
            {{ errors.first('form' + select.name.toString()) }}
          </p>
        </div>
      </div>

      <div class="row photos reset-row">
        <div class="col-12">
          <label :for="'photo_' + image.id"
            v-for="image in formImages"
            :id="'imagePhoto_' + image.id"
            :key="'imagePhoto_' + image.id"
            class="image"
          >
            <div>
              {{ $t('getScouted.form.' + image.name.toString()) }}
            </div>

            <img
              v-if="imagesData['photo_' + image.id] != ''"
              :src="imagesData['photo_' + image.id]"
              :alt="image.name"
              class="blob-img"
            />

            <div v-else class="placeholder">
              <img src="/img/upload.png" alt="Upload" >
            </div>

            <p
              v-if="errors"
              v-show="errors.has('photo_' + image.id.toString())"
              class="error-msg"
            >
              {{ errors.first('photo_' + image.id.toString()) }}
            </p>
          </label>

          <input
            v-for="image in formImages"
            :id="'photo_' + image.id"
            :key="image.id"
            v-validate="'required|image'"
            class="hide"
            type="file"
            :name="'photo_' + image.id"
            @change="processFile($event, 'photo_' + image.id)"
            :disabled="sending"
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
      </div>
      <p v-if="errors.items.length>0" class="error-msg">{{$t('error.please_fill_fields')}}</p>

      <div class="sbmt-btn">
        <button type="submit">
          <span v-if="!messageSended">
            <i class="fa fa-spinner fa-spin" v-if="sending"></i>
            {{ $t('getScouted.form.send') }}
          </span>
          <span v-else>
            <div>{{ $t('success.message_sent') }}</div>
            <div>{{ $t('success.contact_you') }}</div>
          </span>
          
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Validator } from 'vee-validate'
import { mapGetters } from 'vuex'

const dictionary = {
  en: {
    messages: {
      alpha_spaces: _field =>
        'This field may only contain alphabetic characters',
      email: 'This field must be a valid email',
      date_format: 'This field must be in the format dd/MM/yyyy'
    }
  },
  pt: {
    messages: {
      alpha_spaces: _field =>
        'Este campo deve conter apenas caracteres alfabéticos',
      email: 'Este campo deve ser um endereço de email válido',
      date_format: 'Este campo deve estar no formato dd/MM/aaaa'
    }
  }
}

// Override and merge the dictionaries
Validator.localize(dictionary)

export default {
  inject: ['$validator'],

  props: {
    inputs: {
      type: Array,
      required: true
    },
    selects: {
      type: Array,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      data:{
        images:{}
      },
      formData: {},
      imagesData: {},
      errorEn: {
        custom: {}
      },
      errorPt: {
        custom: {}
      },
      sending:false,
      messageSended:false
    }
  },

  computed: {
    formInputs() {
      return this.inputs
    },
    formSelects() {
      return this.selects
    },
    formImages() {
      return this.images
    },
    ...mapGetters({
      currentLocale: 'lang/currentLocale'
    })
  },

  watch: {
    currentLocale: {
      handler: function(val, oldVal) {
        // eslint-disable-next-line no-console
        // console.log('Value changed from: ', oldVal + ' to: ', val)

        val === 'en'
          ? Validator.localize('en', this.errorEn)
          : Validator.localize('pt', this.errorPt)
      },

      deep: true
    }
  },

  mounted() {
    /**
     * Set dynamicaly the formData object
     */
    setTimeout(() => {
      this.formInputs.forEach(input => {
        this.$set(this.formData, input.name, '')

        this.$set(this.errorEn.custom, 'form' + input.name.toString(), {
          required: 'This field is required'
        })
        this.$set(this.errorPt.custom, 'form' + input.name.toString(), {
          required: 'Este campo é requerido'
        })
      })

      this.formSelects.forEach(input => {
        this.$set(this.formData, input.name, '')

        this.$set(this.errorEn.custom, 'form' + input.name.toString(), {
          required: 'This field is required'
        })
        this.$set(this.errorPt.custom, 'form' + input.name.toString(), {
          required: 'Este campo é requerido'
        })
      })

      this.formImages.forEach(input => {
        this.$set(this.imagesData, 'photo_' + input.id, '')

        this.$set(this.errorEn.custom, 'photo_' + input.id.toString(), {
          required: 'This field is required'
        })
        this.$set(this.errorPt.custom, 'photo_' + input.id.toString(), {
          required: 'Este campo é requerido'
        })
      })
    }, 10)

    setTimeout(() => {
      this.currentLocale === 'en'
        ? Validator.localize('en', this.errorEn)
        : Validator.localize('pt', this.errorPt)
    }, 15)
  },
  methods:{
    validateForm(){
      if(this.messageSended){
        return
      }
      this.$validator.validate().then(result=>{
        if(result){
          this.sending = true
          // console.log('Send Form');
          let data = new FormData();
          data.append('name',this.formData.Name)
          let gender
          let women= {
            en:'Female',
            pt:'Feminino'            
          }
          let men={
            en:'Male',
            pt:'Masculino'
          }
          if(this.formData.Gender=='Feminino'){
            gender = {
              label:women[this.currentLocale],
              value:this.formData.Gender,
            }
          }else{
            gender = {
              label:men[this.currentLocale],
              value:this.formData.Gender,
            }
          }
          data.append('gender',JSON.stringify(gender))
          data.append('birthday',this.formData.Birthday)
          data.append('email',this.formData.Email)
          data.append('phone',this.formData.Phone)
          data.append('address',this.formData.Address)
          data.append('height',this.formData.Height)
          data.append('weight',this.formData.Weight)
          data.append('bust',this.formData.Bust)
          data.append('waist',this.formData.Waist)
          data.append('hips',this.formData.Hips)
          data.append('shoes',this.formData.Shoes)
          data.append('eyes',this.formData.Eyes)
          data.append('hair',this.formData.Hair)
          data.append('image1',document.getElementById('photo_0').files[0])
          data.append('image2',document.getElementById('photo_1').files[0])
          data.append('image3',document.getElementById('photo_2').files[0])
          this.$axios.$post(`/get-scouted/${this.currentLocale}`,data)
          .then(response=>{
            this.messageSended = true
          })
          .catch(error=>{
            this.sending = false
          })
          
        }
      })
    },
    processFile(event,data){        
      if(
        !(event.target.files[0].type==('image/jpeg' || 'image/png' || 'image/gif' || 'image/jpg')) &&
        (event.target.files[0].size>5000000)
      ){
        document.querySelector("input[name='"+data+"']").value=''
        return
      }
      // console.log(event,data);
      
      let files = event.target.files || event.dataTransfer.files; 
      this.imagesData[data] = new Image();
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imagesData[data] = event.target.result
      }      
      reader.readAsDataURL(files[0])
    },
  }
}
</script>

<style lang="scss">
.blob-img{
  max-width: 180px;
}
.form {
  form#getScoutedForm {
    .desc-inputs {
      margin-top: 40px;

      .desc {
        @media (max-width: 991px) {
          margin-bottom: 40px;
        }
      }

      .inputs {
        .wrap-input {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          align-content: flex-start;

          input,
          select {
            width: 100%;
            margin-bottom: 35px;
            transition: var(--defaultTransition);
            border: 1px solid;
            border-color: #a9a9a9;
            font-family: var(--formFontFamily);
            font-size: var(--formFontSize);
            font-weight: 300;
            height: 30px;
            z-index: 1;
            background-color: transparent;

            &:focus,
            &:active {
              border-color: var(--dark);
              outline: none;

              ~ label {
                font-weight: bold;
                left: -15px;
                top: -35px;
                transition: none
              }
            }
          }

          /**
          * Finish this latter
          */
          // select {
          //   &:focus,
          //   &:active {
          //     ~ .options {
          //       display: block;
          //     }
          //   }

          //   ~ .options {
          //     display: none;
          //   }

          //   option {
          //     display: none;
          //   }
          // }

          textarea {
            width: 100%;
            margin-bottom: 35px;
            transition: var(--defaultTransition);
            border: 1px solid;
            border-color: #a9a9a9;
            font-family: var(--formFontFamily);
            font-size: var(--formFontSize);
            font-weight: 300;

            &:focus,
            &:active {
              border-color: var(--dark);
              outline: none;

              ~ label {
                font-weight: bold;
                left: -15px;
                top: -35px;
              }
            }
          }

          label {
            position: absolute;
            left: 0px;
            top: -10px;
            font-family: var(--formActiveFontFamily);
            font-size: var(--formFontSize);
            font-weight: 300;
            transition: .3s !important;
            padding: 15px;
            z-index: 0;
          }

          label.not-empty {
            font-weight: bold;
            left: -15px;
            top: -35px;
          }
        }

        .wrap-input.textarea {
          margin-top: 10px;
        }
      }
    }

    .selects {
      .select {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        select {
          width: 100%;
          margin-bottom: 35px;
          transition: var(--defaultTransition);
          border: 1px solid;
          border-color: #a9a9a9;
          font-family: var(--formFontFamily);
          font-size: var(--formFontSize);
          font-weight: 300;
          height: 30px;
          z-index: 1;
          background-color: transparent;

          &:focus,
          &:active {
            border-color: var(--dark);
            outline: none;

            ~ label {
              font-weight: bold;
              left: 15px;
              top: -20px;
            }
          }
        }

        label {
          position: absolute;
          left: 20px;
          top: 2px;
          font-family: var(--formFontFamily);
          font-size: var(--formFontSize);
          font-weight: 300;
          transition: var(--defaultTransition);
          z-index: 0;
        }

        label.not-empty {
          font-weight: bold;
          left: 15px;
          top: -20px;
        }
      }
    }

    .photos {
      margin-bottom: 40px;

      .col-12 {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;

        .image {
          text-align: center;
          cursor: pointer;
          padding: 0 10px;

          &:first-of-type {
            padding-left: 0;
          }
          &:last-of-type {
            padding-right: 0;
          }

          &:hover {
            .placeholder {
              img {
                transform: scale(1.08, 1.08);
              }
            }
          }

          label {
            font-family: var(--formFontFamily);
            font-size: var(--formFontSize);
            font-weight: 300;
          }

          // img {

          // }

          .placeholder {
            padding: 16vh 10vh 16vh 10vh;
            background: #dfe6e9;

            img {
              transition: var(--defaultTransition);
            }
          }
        }
      }
    }

    .sbmt-btn {
      padding: 0 15px;

      button {
        width: 100%;
        padding: 10px 0;
        font-family: var(--titleStrongFontFamily);
        font-size: var(--buttonFontSize);
        text-transform: uppercase;
        color: white;
        background: #3c3c3c;
        border: none;
        transition: all 0.25s ease;

        &:hover {
          background: var(--dark);
        }
      }
    }
  }
}
</style>
