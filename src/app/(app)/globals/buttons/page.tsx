import Button from '../../components/Button'

export default function Page() {
  return (
    <>
      <h1>Buttons</h1>
      <Button text='Default' />
      &nbsp;
      <Button text='Default Link' link='/hello' />
      &nbsp;
      <Button text='Default disabled' disabled />
      <br />
      <Button text='Black' buttonStyle='black' />
      &nbsp;
      <Button text='Black link' buttonStyle='black' link='/hello' />
      &nbsp;
      <Button text='Black disabled' buttonStyle='black' disabled />
      <br />
      <Button text='Secondary' buttonStyle='secondary' />
      &nbsp;
      <Button text='Secondary link' buttonStyle='secondary' link='/hello' />
      &nbsp;
      <Button text='Secondary disabled' buttonStyle='secondary' disabled />
      <br />
      <Button text='Large' size='large' />
      &nbsp;
      <Button text='Large link' link='/hello' size='large' />
      &nbsp;
      <Button text='Large disabled' size='large' disabled />
      <br />
      <Button text='Large black' buttonStyle='black' size='large' />
      &nbsp;
      <Button text='Large black link' buttonStyle='black' link='/hello' size='large' />
      &nbsp;
      <Button text='Large black disabled' buttonStyle='black' size='large' disabled />
      <br />
      <Button text='Large secondary' buttonStyle='secondary' size='large' />
      &nbsp;
      <Button text='Large secondary link' buttonStyle='secondary' link='/hello' size='large' />
      &nbsp;
      <Button text='Large secondary disabled' buttonStyle='secondary' size='large' disabled />
      <br />
      <Button text='Small' size='small' />
      &nbsp;
      <Button text='Small link' link='/hello' size='small' />
      &nbsp;
      <Button text='Small disabled' size='small' disabled />
      <br />
      <Button text='Small black' buttonStyle='black' size='small' />
      &nbsp;
      <Button text='Small black link' buttonStyle='black' link='/hello' size='small' />
      &nbsp;
      <Button text='Small black disabled' buttonStyle='black' size='small' disabled />
      <br />
      <Button text='Small secondary' buttonStyle='secondary' size='small' />
      &nbsp;
      <Button text='Small secondary link' buttonStyle='secondary' link='/hello' size='small' />
      &nbsp;
      <Button text='Small secondary disabled' buttonStyle='secondary' size='small' disabled />
    </>
  )
}
