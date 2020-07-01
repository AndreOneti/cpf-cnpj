# CPF / CNPJ validator


### Como usar

```javascript
const { mask, unMask, validate } = require('cpf-cnpj');


validate('11111111111');                // false - CPF invalido

validate('111.111.111-11');             // false - CPF invalido


validate('11222333444455');             // false - CNPJ invalido

validate('11.222.333/4444-55');         // false - CNPJ invalido


unMask('111.111.111-11');               // "11111111111"

unMask('11.222.333/4444-55');           // "11222333444455"

mask('11111111111');                    // "111.111.111-11"

mask('11222333444455');                 // "11.222.333/4444-55"
```
