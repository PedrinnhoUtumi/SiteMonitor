
import bcrypt from 'bcryptjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



export function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaHash, setSenhaHash] = useState('')
    const navigate = useNavigate()



    useEffect(() => {
        const hashearSenha = async () => {
            const hash = await bcrypt.hash('Senha123', 10)
            setSenhaHash(hash)
            console.log('Senha hasheada:', hash)
        }
        hashearSenha()
    }, [])

    const verificarLogin = async () => {
        if (senha.length >= 8 &&
            temMaiusculas(senha) &&
            temNumeros(senha) &&
            !temEspacos(senha) &&
            usuario === "pedroutumi@gmail.com" || usuario === "brunopena454@gmail.com") {
            console.log('Verificando senha...')
            const isCorrect = await bcrypt.compare(senha, senhaHash)

            if (isCorrect) {
                console.log('Senha correta')
                navigate('/TempoReal')
            } else {
                alert("Senha incorreta!")
            }
        } else {
            alert("Impossível cadastrar!")
        }
    }

    

    function temMaiusculas(texto) {
        return /[A-Z]/.test(texto)
    }

    function temNumeros(texto) {
        return /[0-9]/.test(texto)
    }

    function temEspacos(texto) {
        return texto.includes(' ')
    }

    return (
        <div className="bg-gradient-to-r from-azul_bebe to-azul_escuro h-screen flex items-center justify-center">        
            <div className="caixaLogin w-1/4 h-3/5 flex flex-col justify-center items-center bg-white bg-opacity-10 rounded-3xl shadow-lg p-5 backdrop-blur-sm">
                <img src="../../usuario.png" alt="Ícone de usuário" className="w-32 mb-24" />

                <div className="relative w-3/4 mt-5">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-azul_claro"
                    />
                    <img src="../../usuarioGmail.png" alt="Ícone de email" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                </div>
                <div className="relative w-3/4 mt-5">
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-azul_claro"
                    />
                    <img src="../../cadeado.png" alt="Ícone de senha" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                </div>
                <button
                    onClick={verificarLogin}
                    className="bg-cinza text-white rounded-full w-1/2 py-2 mt-5 hover:bg-roxo hover:opacity-70 font-[Bagel Fat One]"
                >
                    Login
                </button>
            </div>
        </div>
    )
}