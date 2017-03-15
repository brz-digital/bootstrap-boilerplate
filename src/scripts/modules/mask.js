class Mask {
    constructor() {
        console.log('>>> Mask constructor');
        this.initMask();
    }

    initMask() {
        // Slug
        $('.js-mask-slug').keyup(function() {
            let input = $(this);
            let replaceSpace = input.val();
            let result = replaceSpace.replace(' ', '-');
            input.val(result);
        });

        // Phone
        let phoneMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        phoneOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(phoneMaskBehavior.apply({}, arguments), options);
            }
        };

        $('.js-mask-phone').mask(phoneMaskBehavior, phoneOptions);

        // Phone US
        $('.js-mask-phone-us').mask('(000) 000-0000');

        // Date
        $('.js-mask-date').mask('00/00/0000');

        // CNPJ
        $('.js-mask-cnpj').mask('00.000.000/0000-00', {reverse: true});

        // CPF
        $('.js-mask-cpf').mask('000.000.000-00', {reverse: true});

        // CNPJ or CPF
        let cnpjCpfMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 14 ? '00.000.000/0000-00' : '000.000.000-00999';
        },
        cnpjCpfOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(cnpjCpfMaskBehavior.apply({}, arguments), options);
            }
        };

        $('.js-mask-cnpj-cpf').mask(cnpjCpfMaskBehavior, cnpjCpfOptions);

        // RG
        $('.js-mask-rg').mask('0.000.000', {reverse: true});

        // CEP
        $('.js-mask-cep').mask('00000-000');

        // Time
        $('.js-mask-time').mask('00:00:00');

        // Datetime
        $('.js-mask-datetime').mask('00/00/0000 00:00:00');

        // Size
        $('.js-mask-size').mask('0000,00', {reverse: true});

        // Money
        $('.js-mask-money').mask('000.000.000.000.000,00', {reverse: true});

        // Percent
        $('.js-mask-percent').mask('##0,00%', {reverse: true});
    }
}

export default Mask;
