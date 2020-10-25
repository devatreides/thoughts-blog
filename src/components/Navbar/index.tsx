import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarLink from './NavbarLink';

export default function Nav({ hrefReturn, articleMetaData }) {
  return (
    <nav className="py-6 bg-white">
      <div className="container mx-auto flex justify-between items-center p-2 lg:px-6">
        <ul className="flex justify-between items-center space-x-4">
          <NavbarLink href={hrefReturn}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} /> Voltar
          </NavbarLink>
          <strong className="text-accent-1"> | {articleMetaData.title}</strong>
        </ul>
      </div>
    </nav>
  );
}
