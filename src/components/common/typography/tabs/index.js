
import './tabs.scss'

export const NormalTabs = (props) => {

    let {
        options = [{ value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }],
        className = '',
        label = '',
        errorMessage = '',
        data = [],
    } = props;

    return (
        <ul className={`nav custom-tab ${className}`}>
            {data.map((data)=> <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">{data}</a>
            </li>)}
           
          
        </ul>
    )
}