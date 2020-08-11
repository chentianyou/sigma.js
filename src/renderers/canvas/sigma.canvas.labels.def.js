;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  /**
   * This label renderer will just display the label on the right of the node.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.labels.def = function(node, context, settings) {
    var fontSize,
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'];

    if (size < settings('labelThreshold'))
      return;

    if (!node.label || typeof node.label !== 'string')
      return;

    fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
      fontSize + 'px ' + settings('font');
    context.fillStyle = (settings('labelColor') === 'node') ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultLabelColor');

     var w = Math.round(
        context.measureText(node.label).width + fontSize / 2 + size + 7
      );

    context.fillText(
      node.label,
      // Math.round(node[prefix + 'x'] + size + 3),
      // Math.round(node[prefix + 'y'] + fontSize / 3)
      // Math.round(node[prefix + 'x'] - size),
      // Math.round(node[prefix + 'y'] + size + fontSize )
      Math.round(node[prefix + 'x'] - w/2 + size),
      Math.round(node[prefix + 'y'] + size + fontSize )
    );
  };
}).call(this);
