<template>
  <div class="form">
    <form
      v-if="!$_.isEmpty(formInputs)"
      id="contactForm"
      class="w-100"
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="validateForm()"
    >
      <div
        v-for="input in formInputs"
        :key="input.id"
        :class="'wrap-input' + [input.type === 'textarea' ? ' textarea' : '']"
      >
        <input
          v-if="input.type === 'text'"
          :id="'form' + input.name"
          v-model="formData[input.name]"
          v-validate="
            input.name === 'Name' ? 'required|alpha_spaces' : 'required'
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
        <label
          :class="[formData[input.name] != '' ? 'not-empty' : '']"
          :for="'form' + input.name"
          >{{ $t('contact.form.' + input.name.toString()) }}</label>

        <p
          v-if="errors"
          v-show="errors.has('form' + input.name.toString())"
          class="error-msg"
        >
          {{ errors.first('form' + input.name.toString()) }}
        </p>
      </div>

      <div class="sbmt-btn">
        <button type="submit" :disabled="sending">
          <span v-if="!messageSended">
            <i class="fa fa-spinner fa-spin" v-if="sending"></i>
          {{ $t('contact.form.send') }}
          </span>
          <span v-else>
            {{ $t('success.contact') }}
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
    }
  },

  data() {
    return {
      messageSended:false,
      sending:false,
      formData: {},
      errorEn: {
        custom: {}
      },
      errorPt: {
        custom: {}
      }
    }
  },

  computed: {
    formInputs() {
      return this.inputs
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
    this.formInputs.forEach(input => {
      this.$set(this.formData, input.name, '')
      this.$set(this.errorEn.custom, 'form' + input.name.toString(), {
        required: 'This field is required'
      })
      this.$set(this.errorPt.custom, 'form' + input.name.toString(), {
        required: 'Este campo é requerido'
      })

      // eslint-disable-next-line no-console
      // console.log('this.errorEn: ', this.errorPt)
    })

    // if (process.browser) {
    //   window.onNuxtReady(() => {
    this.currentLocale === 'en'
      ? Validator.localize('en', this.errorEn)
      : Validator.localize('pt', this.errorPt)
    //   })
    // }
  },
  methods:{
    validateForm(){
      this.$validator.validate().then(result=>{
        if(result){
          this.sending = true
          console.log('Send Form');
          let data = new FormData();
          data.append('name',this.formData.Name)
          data.append('subject',this.formData.Subject)
          data.append('email',this.formData.Email)
          data.append('message',this.formData.Message)
          this.$axios.$post(`/contact/${this.currentLocale}`,data)
          .then(response=>{
            this.messageSended = true
          })
          .catch(error=>{
            this.sending = false
          })
          
        }
      })
    }
  }
}
</script>

<style lang="scss">
.form {
  form#contactForm {
    .wrap-input {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;

      input {
        width: 100%;
        margin-bottom: 35px;
        transition: var(--defaultTransition);
        border: 1px solid;
        border-color: #a9a9a9;
        font-family: var(--formFontFamily);
        font-size: var(--formFontSize);
        font-weight: 300;
        height: 30px;

        &:focus,
        &:active {
          border-color: var(--dark);
          outline: none;

          ~ label {
            font-weight: bold;
            left: -15px;
            top: -35Px;
            transition: .3s !important;
          }
        }
      }
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
        font-family: var(--formFontFamily);
        font-size: var(--formFontSize);
        font-weight: 300;
        transition: .3s !important;
        padding: 15px;
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
    .sbmt-btn {
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
