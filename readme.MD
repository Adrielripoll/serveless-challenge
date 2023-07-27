<h1>Serverless REST API</h1>

<table>
    <thead>
      <tr>
        <th>Endpoint</th>
        <th>Http method</th>
        <th>Payload</th>
        <th>Http responses</th>
      </tr>  
    </thead>
    <tbody>
        <tr>
            <td>/employee</td>
            <td>POST</td>
            <td>{ name: string, age: number, role: string }</td>
            <td>200, 400, 422</td>
        </tr>
        <tr>
            <td>/employee</td>
            <td>GET</td>
            <td>None</td>
            <td>200</td>
        </tr>
        <tr>
            <td>/employee/{id}</td>
            <td>GET</td>
            <td>None</td>
            <td>200, 404</td>
        </tr>
        <tr>
            <td>/employee/{id}</td>
            <td>PUT</td>
            <td>{ name?: string, age?: number, role?: string }</td>
            <td>200, 404, 422</td>
        </tr>
        <tr>
            <td>/employee/{id}</td>
            <td>DELETE</td>
            <td>None</td>
            <td>204, 404</td>
        </tr>
    </tbody>
</table>

<h2>Data types</h2>

```
Employee {
  id: UUID
  name: string
  age: number
  role: string
}
```

<h2>Instruções</h2>
<ul>
    <li>Para realizar o deploy no AWS Lambda, é só rodar o comando <code>npm run deploy</code>.</li>
    <li>Para executar os testes, é só rodar o comando <code>npm run test</code>.</li>
</ul>

<h2>Observações e melhorias que podem ser feitas.</h2>
<p>Alguns processos foram simplificados e estou adicionando observações do que poderia melhorar caso este serviço fosse para produção.</p>

<ul>
    <li>No endpoint GET /employee, podemos incluir paginação e limite de itens por página.</li>
    <li>Não incluí testes e2e, somente testes unitários.</li>
</ul>

