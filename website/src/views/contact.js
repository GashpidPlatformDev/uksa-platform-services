import SubPage from 'components/subpage';

function ContactUs() {
    return (
        <SubPage mode={'contact-container'} >
            <div className="form-container">
            <h2>Llámanos</h2>
            <a href="tel:+573204532331" className="phone-number">+57 3204532331</a>
            
            <h3>Conoce más</h3>
            <p>Te contactaremos para enviarte más información.</p>
            <p>
                Al dar clic en "ENVIAR" estás aceptando nuestra{" "}
                <a href="#">Política de tratamiento de datos</a> y{" "}
                <a href="#">Aviso de Privacidad</a>.
            </p>

            <form>
                <div className="form-group">
                <input type="text" placeholder="Nombre *" required />
                <input type="text" placeholder="Apellido *" required />
                <input type="email" placeholder="Email *" required />
                </div>

                <div className="form-group">
                <select>
                    <option>Tipo de teléfono</option>
                    <option>Celular</option>
                    <option>Fijo</option>
                </select>
                <input type="text" placeholder="Celular *" required />
                <select>
                    <option>¿Su solicitud es en nombre de una empresa? *</option>
                    <option>Sí</option>
                    <option>No</option>
                </select>
                </div>

                <div className="form-group">
                <select required>
                    <option>Método de aprendizaje preferido *</option>
                    <option>Virtual</option>
                    <option>Presencial</option>
                </select>
                <select required>
                    <option>¿Quién tomará el curso? *</option>
                    <option>Yo</option>
                    <option>Otra persona</option>
                </select>
                </div>

                <div className="form-group">
                <input type="text" placeholder="Ciudad en donde te ubicas *" required />
                <input type="text" placeholder="Idioma" />
                </div>

                <textarea placeholder="Comentarios"></textarea>

                <div className="checkbox-group">
                <input type="checkbox" id="info" />
                <label htmlFor="info">
                    Quiero recibir información y ofertas especiales de{" "}
                    <strong>UKSA</strong> experto en idiomas por email y puedo retirar mi permiso en cualquier momento.
                </label>
                </div>

                <button type="submit" className="submit-button">Conoce más</button>
            </form>
            </div>
        </SubPage>
    );
}

export default ContactUs;
