import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarLink from './NavbarLink';

export default function Nav({ articleMetaData }) {
  return (
    <nav className="py-6 bg-purple-light-1">
      <div className="container mx-auto flex justify-between items-center p-2 lg:px-6">
        <ul className="flex justify-between items-center space-x-4">
          <NavbarLink href="/">
            <FontAwesomeIcon icon={faAngleDoubleLeft} /> Voltar
          </NavbarLink>
          <strong className="text-white"> | {articleMetaData.title}</strong>
        </ul>
      </div>
    </nav>
  );
}
