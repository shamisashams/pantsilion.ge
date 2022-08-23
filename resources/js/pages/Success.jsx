import { Link } from 'react-router-dom'
//import Goal from '../assets/images/icons/goal.png'
import MainButton from '../components/MainButton'

const Success = () => {
    return <div className="bg-zinc-100 ">
        <div className="wrapper max-w-md mx-auto text-center  py-60">
                  <img className='mx-auto' src="/client/assets/images/icons/goal.png" alt="" />
            <div className="text-4xl my-5 bold">Success</div>
            <p className='mb-5'>Thank's for your purchuase, our courier will get in touch with you soon</p>
            <Link to='/'>
            <MainButton>Home page</MainButton>
            </Link>
        </div>

    </div>
}

export default Success
