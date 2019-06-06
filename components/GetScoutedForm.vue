<template>
  <div class="form">
    <form
      id="getScoutedForm"
      class="w-100"
      method="POST"
      enctype="multipart/form-data"
    >
      <div class="row desc-inputs reset-row">
        <div class="col-md-6 desc text-center">
          <p class="c-desc">
            Que bom que você veio até aqui. Que tal fazer parte do nosso time de
            agenciados? Basta preencher esse formulário e adicionar suas
            melhores fotos. Uma dica bacana: Evite maquiagem e faça seus cliques
            em fundo neutro.<br /><br />
            Ah! Capricha na pose, hein!?
          </p>
        </div>

        <div class="col-md-6 inputs">
          <div
            v-for="input in formInputs"
            :key="input.id"
            :class="
              'wrap-input' + [input.type === 'textarea' ? ' textarea' : '']
            "
          >
            <input
              v-if="input.type !== 'textarea' && input.type !== 'select'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
              :type="input.type"
              :name="'form' + input.name"
            />

            <textarea
              v-else-if="input.type === 'textarea'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
              :name="'form' + input.name"
              :rows="input.rows"
            />

            <select
              v-else-if="input.type === 'select'"
              :id="'form' + input.name"
              v-model="formData[input.name]"
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
              >{{ input.placeholder }}</label
            >
          </div>
        </div>
      </div>

      <div class="row selects reset-row">
        <div
          v-for="select in formSelects"
          :key="select.id"
          class="col-md-3 select"
        >
          <select
            :id="'form' + select.name"
            v-model="formData[select.name]"
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
            >{{ select.placeholder }}</label
          >
        </div>
      </div>

      <div class="sbmt-btn">
        <button type="submit">Enviar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    inputs: {
      type: Array,
      required: true
    },
    selects: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      formData: {}
    }
  },

  computed: {
    formInputs() {
      return this.inputs
    },
    formSelects() {
      return this.selects
    }
  },

  mounted() {
    /**
     * Set dynamicaly the formData object
     */
    this.formInputs.forEach(input => {
      this.$set(this.formData, input.name, '')
    })
    this.formSelects.forEach(input => {
      this.$set(this.formData, input.name, '')
    })
  }
}
</script>

<style lang="scss">
.form {
  form#getScoutedForm {
    .desc-inputs {
      margin-top: 40px;

      // .desc {

      // }

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
            margin-bottom: 30px;
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
            margin-bottom: 30px;
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
          margin-bottom: 30px;
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
