<template>
  <section id="getScouted">
    <div class="row get-scouted-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">Quero ser modelo</h1>
      </div>
    </div>

    <div class="row get-scouted">
      <div class="col-12 text-center">
        <h3 class="title-strong text-capitalize">Primeiros Passos</h3>
      </div>

      <div class="row form reset-row">
        <get-scouted-form :inputs="inputs" :selects="selects" />
      </div>
    </div>
  </section>
</template>

<script>
import GetScoutedForm from '~/components/GetScoutedForm'

export default {
  components: {
    'get-scouted-form': GetScoutedForm
  },

  data() {
    return {
      inputs: [
        {
          id: 0,
          name: 'Name',
          placeholder: 'Nome completo',
          type: 'text'
        },
        {
          id: 1,
          name: 'Gender',
          placeholder: 'Gênero',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 3,
          name: 'Birthday',
          placeholder: 'Data de nascimento',
          type: 'text'
        },
        {
          id: 4,
          name: 'Email',
          placeholder: 'Email',
          type: 'email'
        },
        {
          id: 5,
          name: 'Phone',
          placeholder: 'Telefone',
          type: 'text'
        },
        {
          id: 6,
          name: 'Address',
          placeholder: 'Endereço',
          type: 'text'
        }
      ],
      selects: [
        {
          id: 0,
          name: 'Height',
          placeholder: 'Altura',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 1,
          name: 'Weight',
          placeholder: 'Peso',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 2,
          name: 'Bust',
          placeholder: 'Tórax',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 3,
          name: 'Waist',
          placeholder: 'Cintura',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 4,
          name: 'Hips',
          placeholder: 'Quadril',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 5,
          name: 'Shoes',
          placeholder: 'Sapato',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 6,
          name: 'Eyes',
          placeholder: 'Olhos',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 7,
          name: 'Hair',
          placeholder: 'Cabelo',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#getScouted {
  .get-scouted-intro {
    margin-top: 30px;
    margin-bottom: 50px;

    .col-12 {
      display: flex;
      flex-direction: column;
    }
  }

  .get-scouted {
    margin: 0 150px;
    padding: 40px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;
    background: white;

    // .form {
    //   margin-top: 40px;
    // }
  }
}
</style>
