<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin extends CI_Controller
{
  public function index()
  {
    $data['title'] = 'Dashboard';
    load_templates_view('admin/index', $data);
  }
}
