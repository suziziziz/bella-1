<template>
  <div class="form">
    <form
      v-if="!$_.isEmpty(formInputs)"
      id="contactForm"
      class="w-100"
      method="POST"
      enctype="multipart/form-data"
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
        />
        <input
          v-else-if="input.type === 'email'"
          :id="'form' + input.name"
          v-model="formData[input.name]"
          v-validate="'required|email'"
          :type="input.type"
          :name="'form' + input.name"
        />
        <textarea
          v-else-if="input.type === 'textarea'"
          :id="'form' + input.name"
          v-model="formData[input.name]"
          v-validate="'required'"
          :name="'form' + input.name"
          :rows="input.rows"
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
        <button type="submit">
          {{ $t('contact.form.send') }}
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
            left: 0;
            top: -20px;
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
            left: 0;
            top: -20px;
          }
        }
      }
      label {
        position: absolute;
        left: 5px;
        top: 2px;
        font-family: var(--formFontFamily);
        font-size: var(--formFontSize);
        font-weight: 300;
        transition: var(--defaultTransition);
      }
      label.not-empty {
        font-weight: bold;
        left: 0px;
        top: -20px;
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
