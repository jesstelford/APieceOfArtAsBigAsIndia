AFRAME.registerComponent('material-side-modifier', {
  //dependencies: ['yourlandscapecomponent'],  // or wait on an event.
  // TODO: add waiting for an event to this instead of dependencies.
  // Thanks to @pookage (http://www.beardeddevelopment.co.uk/) on the A-Frame Slack for pointing me in the correct direction:https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onload
  //Thanks to @dietrich () for suggesting changing from window.onload = changeMaterialSide; to document.addEventListener(‘DOMContentLoaded’, changeMaterialSide);

  // Allow material-side-modifier component default to 2
  schema: {
  	type: 'int', default: 2 //just a single-property schema, parse and stringify should be inferred.
  },
  // Update the side property of the material of the component to 2 aka THREE.DoubleSide, see: https://threejs.org/docs/#Reference/Materials/Material
  init: function () {
  	console.log("A-Frame and the rest of the components have loaded");
  	var object3D = this.el.object3D;
  	console.log("Object3D is ", object3D);
    var side = this.data; //should be 2, the default value
    console.log("The value of data (side) is ",side); //why isn't this reporting properly?

    //via http://stackoverflow.com/questions/18613295/how-to-set-a-texture-on-a-object3d-child-mesh
    console.log("object3D has: ", object3D.children.length, " children.");
    for(var i in object3D.children) {
        //for all the children of the landscapeObject3D, change the material side property to THREE.DoubleSide aka 2
        console.log("(Method 1: The current number of sides is", object3D.children[i].material.side);
        object3D.children[i].material.side = THREE.DoubleSide;
        console.log("Method 1: The updated number of sides is", object3D.children[i].material.side);
    }

    // via: http://stackoverflow.com/questions/16027131/three-js-how-to-make-double-sided-object
    object3D.traverse( function( node ) {
    	console.log("Traversing...");
    	if( node.material ) {
    		console.log("Method 2: The current number of sides is",node.material.side);
    		node.material.side = THREE.DoubleSide;
    		node.material.needsUpdate = true;
    		console.log("Method 2: The updated number of sides is",node.material.side);
    	}
    });
}
});