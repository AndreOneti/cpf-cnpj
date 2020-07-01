function cpfCnpj() {
  /**
   * Validador de CPF/CNPJ
   * @param {String} vatNumber
   * @return {Boolean}
   * @public
   */

  function validate(vatNumber) {
    vatNumber = vatNumber.replace(/\./g, '').replace('-', '').replace('/', '');
    const distinct = (elemente, index, array) => array.indexOf(elemente) == index;
    if (vatNumber.length == 11) {
      var cpf = vatNumber.trim();
      if (cpf.split('').filter(distinct).length <= 1) return false;
      var soma = 0;
      var resto;
      for (var i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
      if ((resto == 10) || (resto == 11)) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) return false;
      soma = 0;
      for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
      if ((resto == 10) || (resto == 11)) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) return false;
      return true;
    } else if (vatNumber.length == 14) {
      var cnpj = vatNumber.trim();
      if (cnpj.split('').filter(distinct).length <= 1) return false;
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) return false;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Coloca a mascara no CPF/CNPJ
   * @param {String} vatNumber
   * @return {String}
   * @public
   */

  function mask(vatNumber) {
    vatNumberNoMask = vatNumber.replace(/\./g, '').replace('-', '').replace('/', '');
    if (vatNumberNoMask.length == 11) {
      var cpf = vatNumberNoMask.trim();
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
    } else if (vatNumberNoMask.length == 14) {
      var cnpj = vatNumberNoMask.trim();
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
    } else {
      return vatNumber;
    }
  }

  /**
   * Retira a mascara do CPF/CNPJ
   * @param {String} vatNumber
   * @return {String}
   * @public
   */

  function unMask(vatNumber) {
    return vatNumber.replace(/\./g, '').replace('-', '').replace('/', '');
  }

  return {
    validate,
    unMask,
    mask
  }
}

module.exports = cpfCnpj();
