// Angular's "bootstrap" function can be imported from the angular2/platform/browser module.
// Since we want to bootstrap the "ListComponent",
// we have to import it, too.
import { bootstrap }    from 'angular2/platform/browser';
import { ListComponent } from './list.component';

// We can now bootstrap the "ListComponent" as the root component.
bootstrap( ListComponent );
