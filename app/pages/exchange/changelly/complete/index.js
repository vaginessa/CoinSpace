import Ractive from 'lib/ractive';
import emitter from 'lib/emitter';
import details from 'lib/wallet/details';
import template from './index.ract';
import footer from '../footer.ract';

export default function(el) {
  const ractive = new Ractive({
    el,
    template,
    data: {
      toSymbol: '',
      toAddress: '',
      amount: '',
    },
    partials: {
      footer,
    },
  });

  ractive.on('before-show', (context) => {
    ractive.set({
      toSymbol: context.toSymbol,
      toAddress: context.toAddress,
      amount: context.amount,
    });
  });

  ractive.on('done', () => {
    details.set('changellyInfo', null).then(() => {
      emitter.emit('change-changelly-step', 'enterAmount');
    }).catch((err) => {
      console.error(err);
    });
  });

  return ractive;
}
