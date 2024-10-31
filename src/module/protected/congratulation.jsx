import { Button, Icon, PageHeader } from '@shared';
import { useNavigate } from 'react-router-dom';


export const Congratulation = () => {
  const navigate = useNavigate();

  const backNavigate = () => {
    navigate('/retail-pack')
  }

  const benifitList = [
    {
      name: "stock",
      title: "Stocks"
    },
    {
      name: "ncd",
      title: "NCD"
    }
    ,
    {
      name: "ipo",
      title: "IPO"
    }
    ,
    {
      name: "us-stock",
      title: "US Stocks"
    }
    ,
    {
      name: "research",
      title: "Research"
    }
    ,
    {
      name: "mtf",
      title: "MTF"
    }
    ,
    {
      name: "sgb",
      title: "SGB"
    }
    ,
    {
      name: "mf",
      title: "Mutual Fund"
    }
  ]
  return (
    <>
      <div className='page-container'>

        {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
        <form className='form-container' >
          <PageHeader title={"Welcome to Bajaj Broking!"}  backNavigate={backNavigate}/>
          <div className='bg-green/5 px-4 py-6 mb-7 rounded-lg flex justify-center items-center flex-col gap-5'>
            <Icon name="circle-tick" size={60} color="black" ariaLabel="circle-tick icon" />
            <h5 className='text-green text-2xl leading-tight font-medium'>Congratulations, Avinash</h5>
            <p className='text-base text-black-500 text-center leading-tight'>Account Submitted! Please wait while your account is verified by the exchange. This can take 3 to 4 hours.</p>
          </div>
          <div>
            <h6 className='text-xl text-black leading-tight mb-5'>In the meantime explore our app & its many benefits:</h6>
            <ul className='flex flex-wrap gap-6 mb-7'>
              {benifitList.map(({ name, title }) => <li className='flex items-center gap-3 border border-solid border-gray-500 rounded-full w-fit py-2 px-5 min-w-60'>
                <Icon name={name} size={35} color="black" ariaLabel={`${name} icon`} />
                <span className='text-base leading-tight text-navy-blue'>{title}</span>
              </li>)}
            </ul>
          </div>

          <Button type='button' status="valid">EXPLORE APP</Button>
        </form>

      </div>
    </>
  )
}
