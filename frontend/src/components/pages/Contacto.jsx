/* COMPONENTE DE CONTACTO */
import React from "react";

const Contacto = () => {
  return (
    <section className="contacto">      

      <ul className="contacto-lista">
        <li className="card nombre">
          <i className="fas fa-user" aria-hidden="true"></i>
          <div>
            <span className="label">Creador del Blog</span>
            <span className="valor">Óscar Fernández Santiago</span>
          </div>
        </li>

        <li className="card telefono">
          <i className="fas fa-phone" aria-hidden="true"></i>
          <div>
            <span className="label">Teléfono</span>
            {/* 👉 sin enlace */}
            <span className="valor no-link">+34 620 890 221</span>
          </div>
        </li>

        <li className="card linkedin">
          <i className="fab fa-linkedin" aria-hidden="true"></i>
          <div>
            <span className="label">LinkedIn</span>
            <a
              className="valor"
              href="https://www.linkedin.com/in/oscar-fernandez-santiago-92b64364"
              target="_blank"
              rel="noreferrer"
            >
              /oscar-fernandez-santiago
            </a>
          </div>
        </li>

        <li className="card portfolio">
          <i className="fas fa-briefcase" aria-hidden="true"></i>
          <div>
            <span className="label">Portafolio</span>
            <a
              className="valor"
              href="https://servosoftonline.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              servosoftonline.github.io
            </a>
          </div>
        </li>

        <li className="card mail">
          <i className="fas fa-envelope" aria-hidden="true"></i>
          <div>
            <span className="label">Email</span>
            <a className="valor" href="mailto:oscarfernandezsantiago@gmail.com">
              oscarfernandezsantiago@gmail.com
            </a>
          </div>
        </li>
        
      </ul>
    </section>
  );
};

export default Contacto;
