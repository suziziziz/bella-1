<template>
  <div class="form">
    <form
      id="getScoutedForm"
      class="w-100"
      method="POST"
      enctype="multipart/form-data"
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

            <select
              v-else-if="input.type === 'select'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
              v-validate="'required'"
              :name="'form' + input.name"
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
          <div
            v-for="image in formImages"
            :id="'imagePhoto_' + image.id"
            :key="'imagePhoto_' + image.id"
            class="image"
          >
            <label :for="'photo_' + image.id">
              {{ $t('getScouted.form.' + image.name.toString()) }}
            </label>

            <img
              v-if="imagesData['photo_' + image.id] != ''"
              :src="imagesData['photo_' + image.id]"
              :alt="image.name"
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
          </div>

          <input
            v-for="image in formImages"
            :id="'photo_' + image.id"
            :key="image.id"
            v-validate="'required|image'"
            class="hide"
            type="file"
            :name="'photo_' + image.id"
            @change="processFile($event, 'photo_' + image.id)"
          />
        </div>
      </div>

      <div class="sbmt-btn">
        <button type="submit">
          {{ $t('getScouted.form.send') }}
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
      formData: {},
      imagesData: {},
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
  }
}
</script>

<style lang="scss">
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
