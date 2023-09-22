# Processo Seletivo EnviaByBus

<img src="https://blog.enviabybus.com.br/wp-content/uploads/2020/07/Icone-Blog-Enviabybus.png" alt="Exemplo imagem">

> O objetivo deste projeto é realizar o upload de um arquivo de texto contendo transações financeiras de várias lojas, processar essas transações e fornecer as transações válidas, juntamente com o saldo de cada loja e registros das operações que não foram bem-sucedidas.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou a versão mais recente `<Docker Desktop>`
* Você instalou a versão mais recente `<NodeJS>`..

## 🚀 Instalando ProoSelet_EnviaByBus

Para instalar o ProoSelet_EnviaByBus, siga estas etapas:

```
$ npm install
```

## ☕ Iniciando ProoSelet_EnviaByBus

Para inicar API ProoSelet_EnviaByBus, siga estas etapas:

Ajuste o diretório do volume no seu arquivo docker-compose.yaml:

Container mysql
```
 volumes:
      - D:\Pessoal\Processo Seletivo\ProoSelet_EnviaByBus\dbcache:/var/lib/mysql
```
Container node
```
 volumes:
      - D:\Pessoal\Processo Seletivo\ProoSelet_EnviaByBus:/home/node/app
```
Inicie os containers:
```
docker-compose up -d
```
Verifique se API está rodando, visualizando o log:
```
docker logs -f node
```
## ☕ Criando Requisições ProoSelet_EnviaByBus

Utilize algum software para teste de APIs. 
Nós utilizaremos o Insomnia.

1. Crie uma Collection
2. Crie a requisição de Login:
```
http://localhost:8080/login
```
3. Crie a requisição de retorno das transações validas + totalização por empresa
```
http://localhost:8080/transByCompany
```
3. Crie a requisição de retorno das transações que não deram certo
 ```
http://localhost:8080/transWithError
```
4. Cria a requisição para fazer o upload do arquivo .txt com as transações.
 ```
http://localhost:8080/upload/
```
OBS: Todas as requisições utilizam o método POST.

## ☕ Utilizando a API ProoSelet_EnviaByBus

Para utilizar a API é necessário realizar o login.
Isso é feito através dos seguintes passos:

1.Na sua requisição, insira os seguintes credenciais de teste para se autenticar:
 ```
{
	"email": "vini@email.com",
	"password": "12345"
}
```
2. Você receberá a seguinte resposta:
 ```
{
	"statusCode": 200,
	"message": "Login realizado com sucesso!",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmluaWNpdXMiLCJpYXQiOjE2OTU0MTEyMDgsImV4cCI6MTY5NTQxMjQwOH0.Ra_bpfOAPsz6nnm0sHCpepXc28uEgAityhpCALQ_-Ko"
	}
}
```
3. Copie o token para utilização nas requisições posteriores
4. Adicione o token utilizando a opção Bearer.
5. Faça a requisição desejada e verifique o resultado.

## 🤝 Agradecimentos

Agradecimentos ao Victor da EnviaByBus e a toda equipe pela oportunidade e pelo apoio na realização do projeto.

