import Link from 'next/link'
import * as S from './style'
import { Button } from '../Button'

export const ClientWeb = () => (
  <S.WrapperWeb aria-label="cliente">
    <td style={{ textAlign: 'center' }}>
      <input type="checkbox" />
    </td>
    <td>
      <h3>name</h3>
    </td>
    <td>
      <span>algumacoisaemail@</span>
    </td>
    <td style={{ textAlign: 'center' }}>
      <Button text="Deletar" label="Deletar" />
      <Link href="/cliente?id=1">
        <Button text="Editar" label="Editar" />
      </Link>
    </td>
  </S.WrapperWeb>
)

export const ClientMobile = () => (
  <S.WrapperMobile aria-label="client">
    <h3>Name</h3>
    <span>algumacoisaemail@gmail.com</span>
    <div>
      <Button text="Deletar" label="Deletar" />
      <Link href="/cliente?id=1">
        <Button text="Editar" label="Editar" />
      </Link>
    </div>
  </S.WrapperMobile>
)
