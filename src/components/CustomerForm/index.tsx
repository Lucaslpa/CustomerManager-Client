import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import * as S from './styles'
import { TextField } from '../TextField'
import { Button } from '../Button'

import { Customer, CustomerToCreate } from '../../types/Customer'
import { CustomerApi } from '../../api/Customer'
import { LoginFormValidate as Validate } from '../../utils/LoginFormValidator'
import 'react-toastify/dist/ReactToastify.css'

type props = {
  customer?: Customer
}

type fields =
  | 'address'
  | 'birthday'
  | 'cpf'
  | 'email'
  | 'name'
  | 'phone'
  | 'surname'

export const CustomerForm = ({ customer }: props) => {
  const [FormData, setFormData] = useState<
    CustomerToCreate | Record<string, unknown>
  >({})
  const { data } = useSession()
  const [FieldsValidate, setFieldsValidate] = useState({
    address: false,
    birthday: false,
    cpf: false,
    email: false,
    name: false,
    phone: false,
    surname: false,
  })
  const customerApi = new CustomerApi(data?.accessToken || '')

  const validateField = async (field: fields, value: string) => {
    const isValid = await Validate[field].isValid(value || '')
    if (!isValid) {
      setFieldsValidate({ ...FieldsValidate, [field]: true })
    } else {
      setFieldsValidate({ ...FieldsValidate, [field]: false })
    }

    setFormData({ ...FormData, [field]: value })
  }

  async function handleSendForm() {
    if (!data || !data.accessToken || !FormData) return
    if (customer) {
      await customerApi.UpdateOne(customer.id, FormData)
      return
    }
    const formIsValid = await Validate.validateAll.isValid(FormData)
    if (!formIsValid) {
      toast.error('Dados inválidos.', { theme: 'colored' })
      return
    }

    const res = await customerApi.CreateOne(FormData)
    if (res) {
      toast.success('Cliente cadastrado no sistema.', { theme: 'colored' })
    }
  }
  return (
    <>
      <ToastContainer />
      <S.Wrapper aria-label="Form">
        <S.FieldSet>
          <legend>Nome Completo</legend>
          <TextField
            error={FieldsValidate.name}
            placeholder="Nome"
            size="big"
            type="text"
            onChange={(name) => validateField('name', name)}
            defaultValue={customer ? customer.name : ''}
          />
          <TextField
            error={FieldsValidate.surname}
            placeholder="Sobrenome"
            size="big"
            type="text"
            onChange={(text) => validateField('surname', text)}
            defaultValue={customer ? customer.surname : ''}
          />
        </S.FieldSet>

        <S.FieldSet column>
          <legend>Contato</legend>
          <TextField
            error={FieldsValidate.email}
            placeholder="Email"
            size="big"
            type="email"
            onChange={(text) => validateField('email', text)}
            defaultValue={customer ? customer.email : ''}
          />
          <div id="flex">
            <TextField
              error={FieldsValidate.phone}
              placeholder="Telefone"
              size="big"
              type="tel"
              onChange={(text) => validateField('phone', text)}
              defaultValue={customer ? customer.phone : ''}
            />
            <TextField
              error={FieldsValidate.address}
              placeholder="Endereço"
              size="big"
              type="text"
              onChange={(text) => validateField('address', text)}
              defaultValue={customer ? customer.address : ''}
            />
          </div>
        </S.FieldSet>

        <S.FieldSet>
          <legend>Outros</legend>
          <TextField
            error={FieldsValidate.cpf}
            placeholder="CPF"
            size="big"
            type="text"
            onChange={(text) => validateField('cpf', text)}
            defaultValue={customer ? customer.cpf : ''}
          />
          <TextField
            error={FieldsValidate.birthday}
            placeholder="Data de Nascimento"
            size="big"
            type="text"
            onChange={(text) => validateField('birthday', text)}
            defaultValue={customer ? customer.birth : ''}
          />
        </S.FieldSet>

        <S.buttonWrapper>
          <Button
            text={customer ? 'Salvar' : 'Cadastrar'}
            onClick={() => {
              handleSendForm()
            }}
            size="big"
          />
        </S.buttonWrapper>
      </S.Wrapper>
    </>
  )
}
