
import './bredcrumb.scss';
export const NormalBreadcrumb = (props) => {

    let {
        label = '',
        className = '',
    } = props;

    return (
        <nav className={`app-breadcrumb ${className}`} >
        <ol className={`breadcrumb `}>
          <li className="breadcrumb-item active" aria-current="page">{label}</li>
        </ol>
      </nav>
    )
}
