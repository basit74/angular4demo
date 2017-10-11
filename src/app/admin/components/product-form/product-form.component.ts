import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor( private route: ActivatedRoute,
                private router:Router,
                private categoryService: CategoryService,
                private productService: ProductService ) {

    this.categories$ = this.categoryService.getAll();
    this.id= this.route.snapshot.paramMap.get("id");

    if( this.id ) {
      this.productService.get( this.id ).take(1).subscribe( p => this.product = p);
    }
   }

  ngOnInit() {
  }

  save( product ) {

    if( this.id ) this.productService.update( this.id, product );
    else this.productService.create( product );

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if( !confirm(`Are you sureyou want to delete the product?`)) return;

    this.productService.delete( this.id );
    this.router.navigate(['/admin/products']);

  }
}
