import CoverSection from '@/Components/CoverSction/CoverSection'
import Menu from '@/Components/Menu/Menu'
import MenuHeader from '@/Components/Menu/MenuHeader'
import Navbar from '@/Components/Shared/Navbar'



export default function Home() {
  return (
    <>
  
      <CoverSection />
      <Menu />
      <section className="text-center my-16" id="about">
        <MenuHeader
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
          </p>
          <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
          <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <MenuHeader
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel: +0110547862">
            +0110547862
          </a>
        </div>
      </section>
    </>
  )
}
