import {Icon} from '@shared';


export const NeedHelp = () => {
  return (
    <div className='need-help-wrapper'>
      <Icon name="headSet" size={26} ariaLabel="headSet icon" />
      <div className='need-help'>Need Help? Contact us at <a href="" className='text-orange'>1800-833-8888</a> or email <a href="" className='text-orange'>connect@bajajfinserv.in</a></div>
    </div>
  )
}
