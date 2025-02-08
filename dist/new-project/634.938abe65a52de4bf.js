"use strict";(self.webpackChunknew_project=self.webpackChunknew_project||[]).push([[634],{1634:(D,l,s)=>{s.r(l),s.d(l,{CommentUpdateComponent:()=>R});var e=s(4438),F=s(8498),u=s(980),a=s(6354),p=s(9543),n=s(9417),h=s(2140),v=s(2374),C=s(3174),c=s(4839),d=s(9702);let f=(()=>{class o{createCommentFormGroup(t={id:null}){const i=this.convertCommentToCommentRawValue({...this.getFormDefaults(),...t});return new n.gE({id:new n.MJ({value:i.id,disabled:!0},{nonNullable:!0,validators:[n.k0.required]}),content:new n.MJ(i.content),createdDate:new n.MJ(i.createdDate),postComment:new n.MJ(i.postComment),userComment:new n.MJ(i.userComment)})}getComment(t){return this.convertCommentRawValueToComment(t.getRawValue())}resetForm(t,i){const r=this.convertCommentToCommentRawValue({...this.getFormDefaults(),...i});t.reset({...r,id:{value:r.id,disabled:!0}})}getFormDefaults(){return{id:null,createdDate:(0,c.A)()}}convertCommentRawValueToComment(t){return{...t,createdDate:(0,c.A)(t.createdDate,d.B)}}convertCommentToCommentRawValue(t){return{...t,createdDate:t.createdDate?t.createdDate.format(d.B):void 0}}static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275prov=e.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var E=s(60),j=s(651),S=s(8300);function b(o,m){1&o&&(e.EFF(0,"\n          "),e.j41(1,"div",4),e.EFF(2,"\n            "),e.j41(3,"label",21),e.EFF(4,"ID"),e.k0s(),e.EFF(5,"\n            "),e.nrm(6,"input",22),e.EFF(7,"\n          "),e.k0s(),e.EFF(8,"\n        ")),2&o&&(e.R7$(6),e.Y8G("readonly",!0))}function y(o,m){if(1&o&&(e.EFF(0,"\n              "),e.j41(1,"option",12),e.EFF(2),e.k0s(),e.EFF(3,"\n            ")),2&o){const t=m.$implicit;e.R7$(),e.Y8G("ngValue",t),e.R7$(),e.JRh(t.id)}}function T(o,m){if(1&o&&(e.EFF(0,"\n              "),e.j41(1,"option",12),e.EFF(2),e.k0s(),e.EFF(3,"\n            ")),2&o){const t=m.$implicit;e.R7$(),e.Y8G("ngValue",t),e.R7$(),e.JRh(t.login)}}let R=(()=>{class o{constructor(){this.isSaving=!1,this.comment=null,this.postsSharedCollection=[],this.usersSharedCollection=[],this.commentService=(0,e.WQX)(C.j),this.commentFormService=(0,e.WQX)(f),this.postService=(0,e.WQX)(h.K),this.userService=(0,e.WQX)(v.D),this.activatedRoute=(0,e.WQX)(F.nX),this.editForm=this.commentFormService.createCommentFormGroup(),this.comparePost=(t,i)=>this.postService.comparePost(t,i),this.compareUser=(t,i)=>this.userService.compareUser(t,i)}ngOnInit(){this.activatedRoute.data.subscribe(({comment:t})=>{this.comment=t,t&&this.updateForm(t),this.loadRelationshipsOptions()})}previousState(){window.history.back()}save(){this.isSaving=!0;const t=this.commentFormService.getComment(this.editForm);this.subscribeToSaveResponse(null!==t.id?this.commentService.update(t):this.commentService.create(t))}subscribeToSaveResponse(t){t.pipe((0,u.j)(()=>this.onSaveFinalize())).subscribe({next:()=>this.onSaveSuccess(),error:()=>this.onSaveError()})}onSaveSuccess(){this.previousState()}onSaveError(){}onSaveFinalize(){this.isSaving=!1}updateForm(t){this.comment=t,this.commentFormService.resetForm(this.editForm,t),this.postsSharedCollection=this.postService.addPostToCollectionIfMissing(this.postsSharedCollection,t.postComment),this.usersSharedCollection=this.userService.addUserToCollectionIfMissing(this.usersSharedCollection,t.userComment)}loadRelationshipsOptions(){this.postService.query().pipe((0,a.T)(t=>t.body??[])).pipe((0,a.T)(t=>this.postService.addPostToCollectionIfMissing(t,this.comment?.postComment))).subscribe(t=>this.postsSharedCollection=t),this.userService.query().pipe((0,a.T)(t=>t.body??[])).pipe((0,a.T)(t=>this.userService.addUserToCollectionIfMissing(t,this.comment?.userComment))).subscribe(t=>this.usersSharedCollection=t)}static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275cmp=e.VBU({type:o,selectors:[["jhi-comment-update"]],decls:82,vars:7,consts:[[1,"d-flex","justify-content-center"],[1,"col-8"],["name","editForm","novalidate","",3,"ngSubmit","formGroup"],["id","jhi-comment-heading","data-cy","CommentCreateUpdateHeading","jhiTranslate","newProjectApp.comment.home.createOrEditLabel"],[1,"mb-3"],["for","field_content","jhiTranslate","newProjectApp.comment.content",1,"form-label"],["type","text","name","content","id","field_content","data-cy","content","formControlName","content",1,"form-control"],["for","field_createdDate","jhiTranslate","newProjectApp.comment.createdDate",1,"form-label"],[1,"d-flex"],["id","field_createdDate","data-cy","createdDate","type","datetime-local","name","createdDate","formControlName","createdDate","placeholder","YYYY-MM-DD HH:mm",1,"form-control"],["for","field_postComment","jhiTranslate","newProjectApp.comment.postComment",1,"form-label"],["id","field_postComment","data-cy","postComment","name","postComment","formControlName","postComment",1,"form-control",3,"compareWith"],[3,"ngValue"],["for","field_userComment","jhiTranslate","newProjectApp.comment.userComment",1,"form-label"],["id","field_userComment","data-cy","userComment","name","userComment","formControlName","userComment",1,"form-control",3,"compareWith"],["type","button","id","cancel-save","data-cy","entityCreateCancelButton",1,"btn","btn-secondary",3,"click"],["icon","ban"],["jhiTranslate","entity.action.cancel"],["type","submit","id","save-entity","data-cy","entityCreateSaveButton",1,"btn","btn-primary",3,"disabled"],["icon","save"],["jhiTranslate","entity.action.save"],["for","field_id","jhiTranslate","newProjectApp.comment.id",1,"form-label"],["type","number","name","id","id","field_id","data-cy","id","formControlName","id",1,"form-control",3,"readonly"]],template:function(i,r){1&i&&(e.j41(0,"div",0),e.EFF(1,"\n  "),e.j41(2,"div",1),e.EFF(3,"\n    "),e.j41(4,"form",2),e.bIt("ngSubmit",function(){return r.save()}),e.EFF(5,"\n      "),e.j41(6,"h2",3),e.EFF(7,"\n        Crear o editar Comment\n      "),e.k0s(),e.EFF(8,"\n\n      "),e.j41(9,"div"),e.EFF(10,"\n        "),e.nrm(11,"jhi-alert-error"),e.EFF(12,"\n\n        "),e.DNE(13,b,9,1),e.j41(14,"div",4),e.EFF(15,"\n          "),e.j41(16,"label",5),e.EFF(17,"Content"),e.k0s(),e.EFF(18,"\n          "),e.nrm(19,"input",6),e.EFF(20,"\n        "),e.k0s(),e.EFF(21,"\n\n        "),e.j41(22,"div",4),e.EFF(23,"\n          "),e.j41(24,"label",7),e.EFF(25,"Created Date"),e.k0s(),e.EFF(26,"\n          "),e.j41(27,"div",8),e.EFF(28,"\n            "),e.nrm(29,"input",9),e.EFF(30,"\n          "),e.k0s(),e.EFF(31,"\n        "),e.k0s(),e.EFF(32,"\n\n        "),e.j41(33,"div",4),e.EFF(34,"\n          "),e.j41(35,"label",10),e.EFF(36,"Post Comment"),e.k0s(),e.EFF(37,"\n          "),e.j41(38,"select",11),e.EFF(39,"\n            "),e.nrm(40,"option",12),e.EFF(41,"\n            "),e.Z7z(42,y,4,2,null,null,e.Vm6),e.k0s(),e.EFF(44,"\n        "),e.k0s(),e.EFF(45,"\n\n        "),e.j41(46,"div",4),e.EFF(47,"\n          "),e.j41(48,"label",13),e.EFF(49,"User Comment"),e.k0s(),e.EFF(50,"\n          "),e.j41(51,"select",14),e.EFF(52,"\n            "),e.nrm(53,"option",12),e.EFF(54,"\n            "),e.Z7z(55,T,4,2,null,null,e.Vm6),e.k0s(),e.EFF(57,"\n        "),e.k0s(),e.EFF(58,"\n      "),e.k0s(),e.EFF(59,"\n\n      "),e.j41(60,"div"),e.EFF(61,"\n        "),e.j41(62,"button",15),e.bIt("click",function(){return r.previousState()}),e.EFF(63,"\n          "),e.nrm(64,"fa-icon",16),e.EFF(65,"\xa0"),e.j41(66,"span",17),e.EFF(67,"Cancelar"),e.k0s(),e.EFF(68,"\n        "),e.k0s(),e.EFF(69,"\n\n        "),e.j41(70,"button",18),e.EFF(71,"\n          "),e.nrm(72,"fa-icon",19),e.EFF(73,"\xa0"),e.j41(74,"span",20),e.EFF(75,"Guardar"),e.k0s(),e.EFF(76,"\n        "),e.k0s(),e.EFF(77,"\n      "),e.k0s(),e.EFF(78,"\n    "),e.k0s(),e.EFF(79,"\n  "),e.k0s(),e.EFF(80,"\n"),e.k0s(),e.EFF(81,"\n")),2&i&&(e.R7$(4),e.Y8G("formGroup",r.editForm),e.R7$(9),e.vxM(null!==r.editForm.controls.id.value?13:-1),e.R7$(25),e.Y8G("compareWith",r.comparePost),e.R7$(2),e.Y8G("ngValue",null),e.R7$(2),e.Dyx(r.postsSharedCollection),e.R7$(9),e.Y8G("compareWith",r.compareUser),e.R7$(2),e.Y8G("ngValue",null),e.R7$(2),e.Dyx(r.usersSharedCollection),e.R7$(15),e.Y8G("disabled",r.editForm.invalid||r.isSaving))},dependencies:[p.A,E.aY,j.U,S.A,n.YN,n.qT,n.xH,n.y7,n.me,n.Q0,n.wz,n.BC,n.cb,n.X1,n.j4,n.JD],encapsulation:2})}}return o})()}}]);