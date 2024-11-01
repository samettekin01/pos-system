import { FaGithub } from 'react-icons/fa'
import "./github.css"

function Github() {
    return (
        <div className="github">
            <a
                href='https://github.com/samettekin01'
                target='_blank'
                rel='noreferrer'
                className="githubIcon"
            >
                <FaGithub className="githubIcon" />
            </a>
        </div>
    )
}

export default Github