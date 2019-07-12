<template>
  <div class="form">
    <form
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
          v-if="input.type != 'textarea'"
          :id="'form' + input.name"
          v-model="formData[input.name]"
          :type="input.type"
          :name="'form' + input.name"
        />
        <textarea
          v-else
          :id="'form' + input.name"
          v-model="formData[input.name]"
          :name="'form' + input.name"
          :rows="input.rows"
        />
        <label
          :class="[formData[input.name] != '' ? 'not-empty' : '']"
          :for="'form' + input.name"
          >{{ $t('contact.form.' + input.name.toString()) }}</label
        >
      </div>

      <div class="sbmt-btn">
        <button type="submit">{{ $t('contact.form.send') }}</button>
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
    }
  },

  mounted() {
    /**
     * Set dynamicaly the formData object
     */
    this.formInputs.forEach(input => {
      this.$set(this.formData, input.name, '')
    })
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
