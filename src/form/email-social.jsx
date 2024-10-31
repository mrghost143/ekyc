import { Button, PageHeader, Icon } from '@shared';
import { useNavigate } from 'react-router-dom';
export const EmailSocial = (prop) => {
    const navigate = useNavigate()

    const { setPageStatus } = prop;

    const goToEmailVerification = () => {
        setPageStatus(2)
    }

    const backNavigate = () => {
        navigate('/')
    }

    return (
        <>
            {/* <div><Icon name="back" size={22} color="black" ariaLabel="back icon" className='cursor-pointer' onClick={backNavigate} /></div> */}
            <div className='form-container'>
                <PageHeader title={" Add your primary email for important updates & alerts"} subtitle={"Hello Avinash Shukla,"} backNavigate={backNavigate} />
                <div className='need-help-wrapper mb-8'>
                    <Icon name="sheild" size={24} ariaLabel="sheild icon" />
                    <div className='leading-tight'>
                        Email verification helps protect your personal and financial information,
                        ensuring only you have access to important updates and account notifications.</div>
                </div>
                <div className='grid lg:grid-cols-2  grid-cols-1 gap-4'>
                    <Button type='button' status="valid" onClick={goToEmailVerification} mode={'secondary'}>
                        <div className='flex justify-center gap-2 items-center'>
                            <Icon name="mail" size={20} color="#ff6700" ariaLabel="mail icon" />
                            <span className='text-orange'>other email id</span>
                        </div>
                    </Button>
                    <Button type='button' status="valid">
                        <div className='flex justify-center gap-2  items-center'>
                            <Icon name="google" size={20} color="green" ariaLabel="google icon" className={"rounded-full bg-white"} /> google
                        </div>
                    </Button>
                </div>
            </div>
        </>
    )
}
