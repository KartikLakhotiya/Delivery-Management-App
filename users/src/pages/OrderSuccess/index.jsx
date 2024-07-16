import './OrderSuccess.styles.css'
import animationData from './success_animation.json'
import { BsFillPatchCheckFill } from 'react-icons/bs'

const PaymentSuccess = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  return (
    <div className='mb-24 my-12 md:mx-auto md:h-max'>
      <div className='text-center h-full mt-10'>
        <div className='flex flex-col  items-center justify-center md:mt-24 lg:space-x-3 text-secondary'>
          <BsFillPatchCheckFill className='success-icon'/>
          <span className=' text-2xl font-semibold lg:text-3xl helveticaMedium'> {`Payment Successfull!`}</span>
        </div>
      </div>
      <div className='text-center helveticaMedium text-lg lg:text-xl'>
        <p className=' lg:ml-12 px-8'>{`Your Payment is complete.`} <br /> Your order was successfully placed <br /> You will soon receive your order at you doorstep</p>
        <a href={'/menu'} className={`btn lg:ml-12 mt-5 inline-block bg-black text-white py-1 px-20 disabled:cursor-not-allowed disabled:opacity-60`}>Continue Ordering </a>
      </div>
    </div>
  )
}

export default PaymentSuccess